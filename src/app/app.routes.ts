import { Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'items', pathMatch: 'full' },
	{ path: 'items', component: ItemsComponent },
	{ path: 'search', component: SearchComponent }
];
