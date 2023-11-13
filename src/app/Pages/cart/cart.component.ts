import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/Models/Cart.Model';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl:"./cart.component.html"
})
export class CartComponent implements OnInit{
  
  cart: Cart = {
    items: []
  };
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product', 
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  constructor(private _cartService: CartService, private http:HttpClient) {
  }

  ngOnInit(): void {
    this._cartService.cart.subscribe((_cart:Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

  getTotal(items:Array<CartItem>): number{
   return this._cartService.getTotal(items)
  }

  onClearCart(): void{
    this._cartService.clearCart(); 
  }

  onRemoveFromCart(item:CartItem): void{
    this._cartService.removeFromCart(item,true);
  }

  onAddQuantity(item: CartItem): void{
    this._cartService.addToCart(item)
  }

  onRemoveQuantity(item: CartItem): void{
    this._cartService.removeQuantity(item)
  }

  onCheckout():void {
    this.http.post("http://localhost:4242/checkout", {
      items:this.cart.items
    }).subscribe(async () => {
      let stripe = await loadStripe("pk_test_7wkTzBd6wHidVvpfusNjGI9t");
    })
  }

}
