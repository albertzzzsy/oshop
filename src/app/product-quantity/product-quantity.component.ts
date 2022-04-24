import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.sass']
})
export class ProductQuantityComponent {
  @Input('product') product!: Product;
  @Input('shopping-cart') shoppingCart: any;

  constructor(private shoppingcartService: ShoppingCartService) { }

  addToCart() {
    this.shoppingcartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppingcartService.removeFromCart(this.product);
  }

}
