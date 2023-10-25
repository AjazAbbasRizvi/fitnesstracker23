import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';

import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavlistComponent } from './navigation/sidenavlist/sidenavlist.component';
import { AuthorizationModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthorizationModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
