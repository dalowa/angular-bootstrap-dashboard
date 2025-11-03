import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../shared/item.service';

@Component({
  standalone: true,
  selector: 'app-item-detail',
  imports: [CommonModule],
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent {
  @Input() item?: Item;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
