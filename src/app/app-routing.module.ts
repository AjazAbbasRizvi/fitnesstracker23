import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TermsCondsComponent } from './terms-conds/terms-conds.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'training',
    loadChildren: () =>
      import('./training/training/training.module').then(
        (m) => m.TrainingModule
      ),
    canActivate: [AuthGuard],
  },
  { path: 'tnc', component: TermsCondsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
