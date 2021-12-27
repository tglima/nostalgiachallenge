import { Component, OnInit } from '@angular/core';
import { Category, Question } from '../../core/model';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';

@Component(
  {
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
  })

export class HomeComponent implements OnInit
{

  qtQuestions: number = 0;
  qtCategories: number = 0;

  constructor
    (
      private categoryService: CategoryService,
      private questionService: QuestionService,
  ) { }

  ngOnInit(): void
  {
    this._setQuantities();
  }

  private async _setQuantities()
  {
    const categories: Category[] = await this.categoryService.getCategories();
    const questions: Question[] = await this.questionService.getQuestions();

    this.qtCategories = categories.length;
    this.qtQuestions = questions.length;

  }

}
