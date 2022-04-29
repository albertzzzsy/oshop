import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shoppint-cart';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.sass']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart!: ShoppingCart;
  shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
  };
  userId!: string;
  userSubscription!: Subscription;
  
  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user != null) {
        this.userId = user.uid
      }
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', result.key])
  }


}
