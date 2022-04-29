import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shoppint-cart';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.sass']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
  };
  userId!: string;
  cart!: ShoppingCart;
  cartSubscription!: Subscription;
  userSubscription!: Subscription;

  constructor(
    private shoppingCartSerive: ShoppingCartService, 
    private orderService: OrderService,
    private authService: AuthService
    ) { }
  
  ngOnDestroy() {
    return this.cartSubscription.unsubscribe();
    return this.userSubscription.unsubscribe();
  }

  async ngOnInit() {
    let cart$ = await this.shoppingCartSerive.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.authService.user$.subscribe(user => {
      if (user != null) {
        this.userId = user.uid
      }
    })
  }

  placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    this.orderService.storeOrder(order);
  }

}
