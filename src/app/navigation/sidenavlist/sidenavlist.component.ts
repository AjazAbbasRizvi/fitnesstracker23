import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenavlist',
  templateUrl: './sidenavlist.component.html',
  styleUrls: ['./sidenavlist.component.css'],
})
export class SidenavlistComponent implements OnInit, OnDestroy {
  public isAuth$: Observable<boolean>;

  @Output() sidenaveClose = new EventEmitter();

  constructor(
    public authService: AuthServiceService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  logout() {
    this.closeSideNav();
    this.authService.logout();
  }

  ngOnDestroy(): void {}

  closeSideNav() {
    this.sidenaveClose.emit();
  }
}
