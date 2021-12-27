import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './components/page/login/login.component';

@NgModule(
  {
    declarations: [
      AppComponent,
      LoginComponent
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
