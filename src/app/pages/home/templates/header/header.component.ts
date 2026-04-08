import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MenuComponent } from '../../../../shared/components/menu/menu.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ClerkService, ClerkUserButtonComponent } from 'ngx-clerk';

@Component({
  selector: 'template-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [RouterLink, MenuComponent, CommonModule, ClerkUserButtonComponent],
  animations: [
    trigger('headerSlide', [
      // ENTRAR → vem de cima (de -100%)
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate(
          '600ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
      // SAIR → sobe para cima (-100%)
      transition(':leave', [
        animate(
          '300ms ease-out',
          style({ transform: 'translateY(100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class HeaderComponent {
  isWebAppRoute = false;
  logo = environment.imagePath;

  constructor(public router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isWebAppRoute = this.router.url === '/';
      });
  }
}
