import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { fakeBackendProvider, ErrorInterceptor, JwtInterceptor } from './_helpers';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './_components';

import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { HomeComponent } from './home';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule

],
declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
],
providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
],
  bootstrap: [AppComponent]
})
export class AppModule { }
