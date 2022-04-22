import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnDestroy {
  products: Product[] = [];
  subscription: Subscription = new Subscription;
  filteredProducts: Product[] = [];
  category: any;
  
  constructor(
    route: ActivatedRoute,
    productService: ProductService) {

      this.subscription = productService.getAll().pipe(
        map((actions) => 
          actions.map((action) => {
            
            const data = { ...(action.payload.val() as Product)};

            return data;
          })
        )
      ).subscribe((products) => {
        this.products = products;
        route.queryParamMap.subscribe(params => {
          this.category = params.get('category');
          
          this.filteredProducts = (this.category) ?
            this.products.filter(p => p.category === this.category) :
            this.products;
        })
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
