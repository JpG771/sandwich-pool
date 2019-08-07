import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing';
import { HomeComponent } from './core/containers/home/home.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AboutComponent } from './core/components/about/about.component';
import { environment } from 'src/environments/environment';
import { TosComponent } from './core/components/tos/tos.component';
import { PrivacyPolicyComponent } from './core/components/privacy-policy/privacy-policy.component';
import { USER_SERVICE_TOKEN_NAME } from './core/models/user-service';

@NgModule({
  declarations: [
    AboutComponent,
    HomeComponent,
    NavbarComponent,
    TosComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatSidenavModule,
    ...environment.additionnalModules
  ],
  providers: [
    { provide: USER_SERVICE_TOKEN_NAME, useClass: environment.services.userService },
  ],
  bootstrap: [HomeComponent]
})
export class AppModule { }
