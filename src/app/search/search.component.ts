import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemService, Item } from '../shared/item.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-search',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string = '';
  found?: Item;
  message = '';

  constructor(private itemService: ItemService, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.query = code;
      setTimeout(() => this.search(), 0);
    }
  }

  search() {
    this.found = undefined;
    this.message = '';
    if (!this.query) { this.message = 'Ingrese código para buscar'; return; }
    this.itemService.getItemByCode(this.query).pipe(first()).subscribe(item => {
      if (!item) { this.message = 'Ítem no encontrado'; return; }
      this.found = { ...item };
    }, err => {
      console.error(err);
      this.message = 'Error al buscar ítem';
    });
  }

  update() {
    if (!this.found) return;
    this.itemService.updateItem(this.found).pipe(first()).subscribe(ok => {
      this.message = ok ? 'Actualizado correctamente' : 'Error al actualizar';
    }, err => {
      console.error(err);
      this.message = 'Error al actualizar';
    });
  }
}
