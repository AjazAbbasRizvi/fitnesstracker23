import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { TermsCondsComponent } from '../terms-conds/terms-conds.component';
import { SharedModule } from '../shared/shared.module';
import { AuthorizationRoutingModule } from './auth.routing.module';

@NgModule({
  declarations: [SignupComponent, LoginComponent, TermsCondsComponent],
  imports: [
    SharedModule,
    AuthorizationRoutingModule,
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
  ],
  exports: [SignupComponent, LoginComponent, TermsCondsComponent],
})
export class AuthorizationModule {}
