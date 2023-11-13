import { Component, Input } from "@angular/core";
import { Cart, CartItem } from "src/app/Models/Cart.Model";
import { CartService } from "src/app/Services/cart.service";

@Component({
  selector: "app-header",
  templateUrl: `./header.component.html`,
  styles: [],
})
export class HeaderComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  constructor(private _cartService: CartService) {
    
  }

  getTotal(items:Array<CartItem>): number{
    return this._cartService.getTotal(items)
  }

  onClearCart(): void{
    this._cartService.clearCart();
  }
}