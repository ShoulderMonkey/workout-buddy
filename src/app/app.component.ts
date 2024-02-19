import { Component } from '@angular/core';
import { MatIconsSvgService } from './mat-icons-svg.service';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'workout-buddy';
  constructor(
    private svgService: MatIconsSvgService,
    private configService: ConfigService
  ){}
}
