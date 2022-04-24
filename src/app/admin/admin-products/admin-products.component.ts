import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.sass']
})
export class AdminProductsComponent implements OnInit {
  products$: any;

  constructor(private productService: ProductService) { 
    this.products$ = this.productService.getAll();
  }
  
  // private initializeTable(products: any[]) {
  //   this.tableResource = new DataTableResource(products);
  //     this.tableResource.query({ offset: 0})
  //       .then(items => this.items = items);
  //     this.tableResource.count()
  //       .then(count => this.itemCount = count);
  // }

  // reloadItems(params: DataTableParams) {
  //   this.tableResource?.query(params)
  //       .then(items => this.items = items);
  // }

  // filter(query: string) {
  //   let filteredProducts = (query) ?
  //     this.products?.filter(p => p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) :
  //     this.products;
  //   if(filteredProducts != undefined) {
  //     this.initializeTable(filteredProducts);
  //   }
  // }

  ngOnInit(): void {
  }

  // ngOnDestroy(): void {
  //   this.subscription?.unsubscribe();
  // }

}
