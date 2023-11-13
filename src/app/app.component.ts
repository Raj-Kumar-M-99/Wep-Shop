import { Component,OnInit } from '@angular/core';
import { Cart } from './Models/Cart.Model';
import { CartService } from './Services/cart.service';

@Component({
  selector: 'app-root',
  template: `<app-header [cart]="cart"></app-header>
             <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  cart: Cart = { items: [] };

  constructor(private _cartService: CartService) {
  }

  ngOnInit(): void {
    this._cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    })
  }
}
