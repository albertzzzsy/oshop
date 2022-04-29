import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shoppint-cart';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.sass']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shopping = {};
  cart!: ShoppingCart;
  subscription!: Subscription;

  constructor(private shoppingCartSerive: ShoppingCartService, private orderService: OrderService) { }
  
  ngOnDestroy() {
    return this.subscription.unsubscribe();
  }

  async ngOnInit() {
    let cart$ = await this.shoppingCartSerive.getCart();
    cart$.subscribe(cart => this.cart = cart);
  }

  placeOrder() {
    let order = {
      datePlaced: new Date().getTime(),
      shipping: this.shopping,
      items: this.cart.items.map(i => {
        return {
          products: {
            title: i.title,
            imageUrl: i.imageUrl, 
            price: i.price,
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice,
        }
      })
    };

    this.orderService.storeOrder(order);
  }

}
