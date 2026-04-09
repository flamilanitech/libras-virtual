import { Component } from '@angular/core';
import { CardUIComponent } from 'src/app/components/UI/card-ui/card-ui.component';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [BreadcrumbComponent, CardUIComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css',
})
export class PrivacyComponent {
  title: string = 'Política de Privacidade';
  styles: string = 'sectionTop';
  link: string = '/';
}
