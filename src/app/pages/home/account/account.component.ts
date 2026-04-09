import { Component } from '@angular/core';
import { CardUIComponent } from 'src/app/components/UI/card-ui/card-ui.component';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { ClerkService, ClerkSignInComponent, ClerkUserProfileComponent } from 'ngx-clerk';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CardUIComponent, 
    BreadcrumbComponent, 
    ClerkSignInComponent, 
    ClerkUserProfileComponent, 
    CommonModule,
    RouterLink
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  title = 'Conta';
  link = '/';
  
  constructor(public clerkService: ClerkService) {}
}
