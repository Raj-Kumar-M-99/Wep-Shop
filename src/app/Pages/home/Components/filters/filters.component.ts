import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/Services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl:"./filters.component.html",
})
export class FiltersComponent implements OnInit,OnDestroy{
  @Output() showCategory = new EventEmitter<string>();
  categorySubscription: Subscription | undefined;
  categories:Array<string> | undefined;
  
  constructor(private _storeService: StoreService) {}
  

  ngOnInit(): void {
    this.categorySubscription = this._storeService.getAllCategories()
                                .subscribe((response) => {
                                  this.categories = response;
                                })
  } 

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
 
  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }


}
