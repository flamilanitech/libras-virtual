import { Component } from '@angular/core';
import { appVersion } from 'src/environments/version';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'template-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [BootstrapIconsModule, RouterLink],
})
export class FooterComponent {
  version = appVersion;
  currentYear = new Date().getFullYear();
}
