import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './components/page/login/login.component';
import { Pg404Component } from './components/page/pg404/pg404.component';

@NgModule(
  {
    declarations: [
      AppComponent,
      LoginComponent,
      Pg404Component
    ],
    imports:
      [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
    providers: [],
    bootstrap: [AppComponent]
  })
export class AppModule { }
