import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shoppint-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.sass']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser | undefined;
  cart$: Observable<ShoppingCart> | undefined;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {

  }

  async ngOnInit() {
    // Subscribe to user data
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    // Get shopping cart data
    this.cart$ = await this.shoppingCartService.getCart();
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
    // cart$.snapshotChanges().pipe(
    //   map((x:any) => {
    //     const items = x.payload.val();
    //     console.log(items)
    //     return items;
    //   })
    // ).subscribe(cart => {
    //   let count = this.shoppingCartService.getTotalItemCount(cart);

      
    // })
  }

  logout() {
    this.auth.logout();
  }

  test() {
    console.log('success');
  }

}
