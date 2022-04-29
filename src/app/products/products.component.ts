import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shoppint-cart';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: any;
  cart$!: Observable<ShoppingCart>;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) {  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().pipe(
      map((actions) => 
        actions.map((action) => {
          const data = { ...( action.payload.val() as Product)};
          return data;
        })
      )
    ).subscribe((products) => {
      this.products = products;
      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      })
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category) :
    this.products;
  }
}
