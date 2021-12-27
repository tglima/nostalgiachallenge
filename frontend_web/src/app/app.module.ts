import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './components/page/login/login.component';
import { Pg404Component } from './components/page/pg404/pg404.component';
import { HomeComponent } from './components/home/home.component';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';
import { CategoryManagerComponent } from './components/category/category-manager/category-manager.component';

@NgModule(
  {
    declarations: [
      AppComponent,
      LoginComponent,
      Pg404Component,
      HomeComponent,
      CategoryManagerComponent,
      ListCategoryComponent
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
