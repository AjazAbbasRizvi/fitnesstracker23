import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // public isLoading ;
  isLoading$: Observable<boolean>;

  constructor(
    public authService: AuthServiceService,
    private store: Store<{ ui: fromRoot.State }>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
