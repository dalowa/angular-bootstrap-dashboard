import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Item {
  id: number;
  name: string;
  code: string;
  description: string;
}

const BASE = 'https://fakestoreapi.com/products';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private itemsCache: Item[] | null = null;

  constructor(private http: HttpClient) {}

  private mapProduct(src: any): Item {
    return {
      id: Number(src.id),
      name: src.title ?? `Product ${src.id}`,
      code: `P${String(src.id).padStart(3, '0')}`,
      description: src.description ?? ''
    };
  }

  getItems(): Observable<Item[]> {
    if (this.itemsCache) {
      return of(this.itemsCache);
    }
    return this.http.get<any[]>(BASE).pipe(
      map(products => products.map(p => this.mapProduct(p))),
      map(items => {
        this.itemsCache = items;
        return items;
      }),
      catchError(err => {
        console.error('Failed to load products', err);
        return of([]);
      })
    );
  }

  getItemById(id: number): Observable<Item | undefined> {

    if (this.itemsCache) {
      const found = this.itemsCache.find(it => it.id === id);
      if (found) return of(found);
    }
    return this.http.get<any>(`${BASE}/${id}`).pipe(
      map(p => this.mapProduct(p)),
      catchError(err => {
        console.error('Failed to get product', err);
        return of(undefined);
      })
    );
  }

  getItemByCode(code: string): Observable<Item | undefined> {

    if (!code) return of(undefined);
    const m = code.match(/^P0*([0-9]+)$/i);
    if (m) {
      const id = Number(m[1]);
      return this.getItemById(id);
    }

    return this.getItems().pipe(
      map(items => items.find(it => it.name.toLowerCase().includes(code.toLowerCase())))
    );
  }

  updateItem(updated: Item): Observable<boolean> {

    const payload = { title: updated.name, description: updated.description };
    return this.http.put<any>(`${BASE}/${updated.id}`, payload).pipe(
      map(resp => {

        if (this.itemsCache) {
          const idx = this.itemsCache.findIndex(i => i.id === updated.id);
          if (idx !== -1) this.itemsCache[idx] = { ...updated };
        }
        return true;
      }),
      catchError(err => {
        console.error('Failed to update product', err);
        return of(false);
      })
    );
  }
}
