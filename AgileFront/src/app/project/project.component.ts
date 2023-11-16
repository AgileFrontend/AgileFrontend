import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
})
export class ProjectComponent {

  title = '';
  name = '';
  date = '';
  img : unknown;
  post_content = '';  

}
