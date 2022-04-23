import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.sass']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser | undefined;
  shoppingCartItemCount!: number;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {

  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

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
      }
    })
  }

  logout() {
    this.auth.logout();
  }

  test() {
    console.log('success');
  }

}
