import { NgModule } from '@angular/core';
import { AuthGuard } from './guard/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Pg404Component } from './components/page/pg404/pg404.component';
import { LoginComponent } from './components/page/login/login.component';
import { BaseComponent } from './components/template/base/base.component';
import { ListQuestionComponent } from './components/question/list-question/list-question.component';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';
import { CategoryManagerComponent } from './components/category/category-manager/category-manager.component';
import { QuestionManagerComponent } from './components/question/question-manager/question-manager.component';

const routes: Routes = [

  {
    path: '', component: BaseComponent,
    children:
      [
        {
          path: '',
          component: HomeComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'home',
          redirectTo: '',
          canActivate: [AuthGuard]
        },
        {
          path: 'category/add',
          component: CategoryManagerComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'category/list',
          component: ListCategoryComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'category/edit/:id',
          component: CategoryManagerComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'question/add',
          component: QuestionManagerComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'question/list',
          component: ListQuestionComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'question/edit/:id',
          component: QuestionManagerComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: '**',
          component: Pg404Component,
          canActivate: [AuthGuard]
        }
      ]
  }
];

@NgModule(
  {
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }
