import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product!: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: any;

  constructor(private shoppingcartService: ShoppingCartService) { }

  addToCart() {
    this.shoppingcartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppingcartService.removeFromCart(this.product);
  }

  getQuantity(product: Product) {
    if (!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.title];
    return item ? item.quantity: 0
  }

  ngOnInit(): void {
  }

}
