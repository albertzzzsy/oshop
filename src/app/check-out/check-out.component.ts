import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shoppint-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.sass']
})
export class CheckOutComponent implements OnInit {
  cart$!: Observable<ShoppingCart>;

  constructor(
    private shoppingCartSerive: ShoppingCartService, 

    ) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartSerive.getCart();
  }
}
