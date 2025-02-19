import { Component } from '@angular/core';
import { MainContentComponent } from './main-content/main-content.component';
import { HeaderComponent } from './header/header.component';
@Component({
  selector: 'app-root',
  imports: [ MainContentComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'guitar-website';
}
