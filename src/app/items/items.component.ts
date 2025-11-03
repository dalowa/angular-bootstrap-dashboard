import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemService, Item } from '../shared/item.service';
import { ItemDetailComponent } from '../item-detail/item-detail.component';

@Component({
  standalone: true,
  selector: 'app-items',
  imports: [CommonModule, RouterModule, ItemDetailComponent],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  items$!: Observable<Item[]>;
  selectedItem?: Item;

  constructor(private itemService: ItemService) {
    this.items$ = this.itemService.getItems();
  }

  openDetail(item: Item) {
    this.selectedItem = item;
  }

  closeDetail() {
    this.selectedItem = undefined;
  }
}
