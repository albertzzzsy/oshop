import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shoppint-cart';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.sass']
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input('cart') cart!: ShoppingCart;

  constructor() { }

  ngOnInit(): void {
  }

}
