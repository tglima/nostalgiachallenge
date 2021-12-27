import { Question } from '../../../core/model';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';

@Component(
  {
    selector: 'app-list-question',
    templateUrl: './list-question.component.html',
    styleUrls: ['./list-question.component.scss']
  })

export class ListQuestionComponent implements OnInit
{

  public questions: Question[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void
  {
    this._loadQuestions();
  }

  private async _loadQuestions(): Promise<void>
  {
    this.questions =
      Question.orderByCategoryDescAndLevel(
        (await this.questionService.getQuestions()));
  }

}
