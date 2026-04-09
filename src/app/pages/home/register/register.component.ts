import { Component } from '@angular/core';
import { ClerkSignUpComponent } from 'ngx-clerk';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { CardUIComponent } from 'src/app/components/UI/card-ui/card-ui.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ClerkSignUpComponent,
    BreadcrumbComponent,
    CardUIComponent,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  title = 'Criar Conta';
  link = '/';
}
