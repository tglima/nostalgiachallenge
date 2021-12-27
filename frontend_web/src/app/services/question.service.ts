import { Question } from '../core/model';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ResultDTO } from '../core/project-core';

@Injectable(
  {
    providedIn: 'root'
  })

export class QuestionService
{

  constructor(private apiService: ApiService) { }

  async getQuestions(): Promise<Question[]>
  {
    let arrayDefault: Question[] = [];
    let resultDTO: ResultDTO = await this.apiService.getQuestionsDB();

    if (resultDTO.hasSuccessfully && resultDTO.object !== undefined)
    {
      let questions = resultDTO.object;
      return questions;
    }

    return arrayDefault;
  }

  async getQuestionByID(idQuestion: string): Promise<ResultDTO>
  {
    return (await this.apiService.getQuestionDB(idQuestion))
  }

  async saveNewQuestion(question: Question): Promise<ResultDTO>
  {
    return (await this.apiService.saveQuestionDB(question));
  }

  async updateQuestion(question: Question): Promise<ResultDTO>
  {
    return (await this.apiService.updateQuestionDB(question));
  }

}