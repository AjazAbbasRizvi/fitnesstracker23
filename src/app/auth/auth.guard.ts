import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthServiceService } from './auth-service.service';
import * as fromRoot from 'src/app/app.reducer';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.store.select(fromRoot.getAuthState)) {
      return this.store.select(fromRoot.getIsAuth);
    } else {
      this.router.navigate(['/login']);
      return this.store.select(fromRoot.getIsAuth);
    }
  }
}
