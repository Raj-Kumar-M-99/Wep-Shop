import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { Product } from 'src/app/Models/Product.Model';

@Component({
  selector: 'app-product-box',
  templateUrl: "./product-box.component.html"
})
  
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();

  ngOnInit(): void {
  }
  
  onAddToCart(): void{
    this.addToCart.emit(this.product);
  }

}
