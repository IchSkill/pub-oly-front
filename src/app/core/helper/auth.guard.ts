// auth.guard.ts
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn();
    console.log('AuthGuard: isLoggedIn', isLoggedIn);
    console.log('AuthGuard: access_token', this.authService.accessToken);
    if (isLoggedIn) {
      return true;
    } else {
      console.log("Error: no Auth");
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}