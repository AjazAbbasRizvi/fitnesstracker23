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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sideNavToggle = new EventEmitter();

  isAuth$: Observable<boolean>;
  constructor(
    public authService: AuthServiceService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }
  ngOnDestroy(): void {}

  toggleSidebar() {
    this.sideNavToggle.emit();
  }

  logout() {
    this.authService.logout();
  }
}
