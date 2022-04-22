import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent {
  products$: any;
  category: any;
  categories$: any;

  constructor(
    route: ActivatedRoute,
    productService: ProductService, 
    categoryService: CategoryService) {
    this.products$ = productService.getAll();
    this.categories$ = categoryService.getAll();
    
    route.queryParamMap.subscribe(params => {
      this.category = params.get('category')
    })
  }

  ngOnInit(): void {
  }

}
