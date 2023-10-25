import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  public maxDate: Date;
  public minDate: Date;
  public isLoading$: Observable<boolean>;
  constructor(
    public router: Router,
    public authService: AuthServiceService,
    private store: Store<{ ui: fromRoot.State }>
  ) {}

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 70);

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  ngOnDestroy(): void {}

  goToTNC() {
    this.router.navigate(['/tnc']);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
