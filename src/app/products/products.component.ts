import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent {
  products$: any;

  constructor(productService: ProductService) {
    this.products$ = productService.getAll();
  }

  ngOnInit(): void {
  }

}
