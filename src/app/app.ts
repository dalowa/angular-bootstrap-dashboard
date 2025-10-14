import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header';
import { SidebarComponent } from './sidebar/sidebar';
import { MainContentComponent } from './main-content/main-content';
import { FooterComponent } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SidebarComponent, MainContentComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-bootstrap-dashboard');
}
