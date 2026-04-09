import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { ClerkService } from 'ngx-clerk';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private clerkService: ClerkService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.clerkService.user$.pipe(
      take(1),
      map((user) => {
        if (user) {
          return true;
        }

        // Se não estiver logado, redireciona para a página de conta (onde está o login)
        return this.router.createUrlTree(['/conta']);
      }),
    );
  }
}
