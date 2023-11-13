import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product.Model';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/Services/cart.service';
import { StoreService } from 'src/app/Services/store.service';

const ROWS_HEIGHT:{[id:number]:number} = {1:400,3:335,4:350}

@Component({
  selector: 'app-home',
  templateUrl:"./home.component.html",    
})
export class HomeComponent implements OnInit,OnDestroy {
  cols = 3;
  rowHeigth = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined; 
  sort = 'desc';
  count = '12';
  productSubscription:Subscription | undefined;

  constructor(private cartService:CartService,private storeServide:StoreService){}
  

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productSubscription = this.storeServide.getAllProducts(this.count, this.sort,this.category)
                               .subscribe((_product) => {
                                 this.products = _product;
                               })
  }

  onColumnsCountChange(colsNum:number): void{
    this.cols = colsNum;
    this.rowHeigth = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product:Product): void{
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
      
    })
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  onItemsCountChange(newCount:number): void{
    this.count = newCount.toString();
    this.getProducts(); 
  }

  onSortChange(newSort:string): void{
    this.sort = newSort;
    this.getProducts();
  }

}
 