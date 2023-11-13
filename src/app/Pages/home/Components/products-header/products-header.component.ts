import { Component, OnInit,EventEmitter,Output} from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  sort = "desc";
  itemsShowCount = 12;

  ngOnInit(): void {}

  onSortUpdate(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }

  onItemUpdated(count:number): void { 
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
  }  

  onColumnUpdated(colsNum: number): void { 
  this.columnsCountChange.emit(colsNum)
  }
}
