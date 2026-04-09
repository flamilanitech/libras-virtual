import { Component } from '@angular/core';
import { CardUIComponent } from 'src/app/components/UI/card-ui/card-ui.component';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [BreadcrumbComponent, CardUIComponent],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.css',
})
export class TermsComponent {
  title: string = 'Termos de Uso';
  styles: string = 'sectionTop';
  link: string = '/';
}
