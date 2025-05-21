import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { BaseUiComponent } from './components/base-ui/base-ui.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatMenuModule, MatToolbarModule, RouterOutlet, FormsModule, BaseUiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Startly';
}