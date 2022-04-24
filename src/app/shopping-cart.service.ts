import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from './models/product';
import { map, Observable, take } from 'rxjs';
import { ShoppingCart } from './models/shoppint-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .snapshotChanges()
      .pipe(
        map((x:any) => {
          const items = x.payload.val().items;
          return new ShoppingCart(items);
        })
      )
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key ?? '');
    return result.key ?? '';
  }

 async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.title);
    item$.snapshotChanges().pipe((take(1)))
      .subscribe((item: any) => {
        if(item$) item$.update({
          // product: product,
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity:
            (item.payload.exists() ? item.payload.val()['quantity'] : 0) + 1,
        });
      })
  }

  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.title);
    item$.snapshotChanges().pipe((take(1)))
      .subscribe((item: any) => {
        if(item$) item$.update({
          // product: product,
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity:
            (item.payload.exists() ? item.payload.val()['quantity'] : 1) - 1,
        });
      })
  }
}
