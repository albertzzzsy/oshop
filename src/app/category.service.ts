import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    // console.log(this.db.list('/categories', ref => ref.orderByChild('name')).valueChanges());
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges();
    // return this.db.list('/categories', ref => ref.orderByChild('name')).valueChanges();
  }
}
