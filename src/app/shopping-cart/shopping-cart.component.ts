import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {
  @Input('product') product!: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: any;

  shoppingCartItemCount!: number;
  cartsProduct: string[] = [];
  endTotalPrice: number = 0;

  
  
  constructor(private shoppingCartService: ShoppingCartService) { }

  totalPrice(a: number, b: number) {
    return a*b
  }

  // addToCart() {
  //   this.shoppingCartService.addToCart(this.product);
  // }

  // removeFromCart() {
  //   this.shoppingCartService.removeFromCart(this.product);
  // }

  clearCart() {
    this.shoppingCartService.clearCart();
    this.cartsProduct = [];
    this.endTotalPrice = 0;
  }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    // cart$.snapshotChanges().pipe(
    //   map((x:any) => {
    //     const items = x.payload.val().items;
    //     console.log(items)
    //     return items;
    //   })
    // ).subscribe(cart => {
    //   this.shoppingCartItemCount = 0;
    //   for (let productId in cart) {
    //     this.shoppingCartItemCount += cart[productId].quantity;
    //   }
    // })
    cart$.snapshotChanges().pipe(
      map((x:any) => {
        const items = x.payload.val();
        console.log(items)
        return items;
      })
    ).subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items) {
        this.shoppingCartItemCount += cart.items[productId].quantity;
        const totalPrice =  cart.items[productId].product.price * cart.items[productId].quantity;
        this.cartsProduct.push(
          cart.items[productId].product.imageUrl,
          cart.items[productId].product.title, 
          cart.items[productId].quantity,
          cart.items[productId].product.price,
          String(totalPrice),
        );
        this.endTotalPrice += totalPrice;
      }
      console.log(this.cartsProduct)
    })
  }

}
