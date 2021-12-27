import { User } from '../core/model';
import { Session } from '../core/model';
import { Category } from '../core/model';
import { Question } from '../core/model';
import { catchError, retry } from 'rxjs';
import { Injectable } from '@angular/core';
import { ResultDTO } from '../core/project-core';
import { environment as envConfig } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable(
  {
    providedIn: 'root'
  })

export class ApiService
{

  constructor(private httpClient: HttpClient) { }

  private _httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  private _handleError(err: HttpErrorResponse): ResultDTO
  {
    let message = "";
    let resultRequest: ResultDTO = new ResultDTO();
    if (err.error instanceof ErrorEvent)
    {
      message = err.error.message;
    }
    else
    {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    resultRequest.msgError = message;
    resultRequest.hasSuccessfully = false;
    return resultRequest;
  }

  public async getUserFromLogin(username: string, password: string): Promise<ResultDTO>
  {
    const urlRequest = `${envConfig.apiUrl}/users/?username=${username}&password=${password}`;

    let resultDTO = new ResultDTO();

    resultDTO = await new Promise<ResultDTO>((result) =>
    {
      this.httpClient.get<User[]>(urlRequest)
        .pipe(
          retry(3),
          catchError(err =>
          {
            return err;
          })
        )
        .subscribe({
          next: data =>
          {
            resultDTO.object = data;
            result(resultDTO);
          }
          , error: err =>
          {
            resultDTO = this._handleError(err);
            result(resultDTO);
          }
        })
    }).then(result =>
    {
      return result;
    })

    if (resultDTO.msgError === undefined && resultDTO.object.length > 0)
    {
      resultDTO.object = resultDTO.object[0];
      resultDTO.hasSuccessfully = true;
    }

    return resultDTO;
  }

  public async getSessionsUser(idUser: string): Promise<ResultDTO>
  {
    const urlRequest = `${envConfig.apiUrl}/sessions/?idUser=${idUser}`;
    let resultDTO = new ResultDTO();
    resultDTO = await new Promise<ResultDTO>((resolve) =>
    {
      this.httpClient.get<Session[]>(urlRequest)
        .pipe(
          retry(3),
          catchError(err =>
          {
            return err;
          })
        ).subscribe(
          {
            next: data =>
            {
              resultDTO.object = data;
              resolve(resultDTO);
            },
            error: err =>
            {
              resultDTO = this._handleError(err);
              resolve(resultDTO);
            }
          }
        )


    }).then(result =>
    {

      if (resultDTO.msgError === undefined && resultDTO.object !== undefined)
      {
        resultDTO.hasSuccessfully = true;
      }

      return resultDTO;
    })

    return resultDTO;
  }

  public async saveSessionDB(session: Session): Promise<ResultDTO>
  {
    const urlRequest = `${envConfig.apiUrl}/sessions`;
    let resultRequestDTO: ResultDTO = new ResultDTO();
    resultRequestDTO = await new Promise<ResultDTO>((result) =>
      this.httpClient.post(urlRequest, session, { headers: this._httpHeaders })
        .pipe(
          retry(2),
          catchError(err =>
          {
            return err;
          })
        )
        .subscribe({
          next: data =>
          {
            resultRequestDTO.object = data;
            result(resultRequestDTO);
          },
          error: err =>
          {
            resultRequestDTO = this._handleError(err);
          }
        })
    ).then(result =>
    {
      return result;
    });

    if (resultRequestDTO.msgError === undefined && resultRequestDTO.object !== undefined)
    {
      resultRequestDTO.hasSuccessfully = true;
    }


    return resultRequestDTO;

  }

  public async updateSessionDB(session: Session): Promise<ResultDTO>
  {
    const urlRequest = `${envConfig.apiUrl}/sessions/${session.id}/`;

    let resultRequestDTO: ResultDTO = new ResultDTO();
    resultRequestDTO = await new Promise<ResultDTO>((result) =>
      this.httpClient.put(urlRequest, session, { headers: this._httpHeaders })
        .pipe(
          retry(2),
          catchError(err =>
          {
            return err;
          })
        )
        .subscribe({
          next: data =>
          {
            resultRequestDTO.object = data;
            result(resultRequestDTO);
          },
          error: err =>
          {
            resultRequestDTO = this._handleError(err);
          }
        })
    ).then(result =>
    {
      return result;
    });

    if (resultRequestDTO.msgError === undefined && resultRequestDTO.object !== undefined)
    {
      resultRequestDTO.hasSuccessfully = true;
    }

    return resultRequestDTO;
  }

  public async finishAllSessionUserDB(idUser: string): Promise<ResultDTO>
  {
    let resultGetSessions: ResultDTO = await this.getSessionsUser(idUser);
    let resultRequestDTO: ResultDTO = new ResultDTO();

    resultRequestDTO = await new Promise<ResultDTO>((result) =>
    {

      let sessions = resultGetSessions;
      if (resultGetSessions.hasSuccessfully && resultGetSessions.object.length > 0)
      {
        const sessions: Session[] = resultGetSessions.object;
        sessions.forEach(s =>
        {
          this.httpClient.delete(`${envConfig.apiUrl}/sessions/${s.id}`)
            .pipe(
              retry(3),
              catchError(err =>
              {
                return err
              })
            )
            .subscribe({
              error: err =>
              {
                resultRequestDTO = this._handleError(err);
              }
            });
        })

        if (resultRequestDTO.msgError !== undefined)
        {
          resultRequestDTO.hasSuccessfully = false;
          result(resultRequestDTO);
        } else
        {
          resultRequestDTO.hasSuccessfully = true;
          result(resultRequestDTO);
        }
      }
    }).then(result =>
    {
      return result;
    })

    return resultRequestDTO;
  }

  public async getCategoriesDB(): Promise<ResultDTO>
  {
    const urlRequest = `${envConfig.apiUrl}/categories`;

    let resultDTO = new ResultDTO();

    resultDTO = await new Promise<ResultDTO>((result) =>
    {
      this.httpClient.get<Category[]>(urlRequest)
        .pipe(
          retry(3),
          catchError(err =>
          {
            return err;
          })
        )
        .subscribe({
          next: data =>
          {
            resultDTO.object = data;
            result(resultDTO);
          }
          , error: err =>
          {
            resultDTO = this._handleError(err);
            result(resultDTO);
          }
        })

    }).then(result =>
    {
      return result;
    });

    if (resultDTO.msgError === undefined && resultDTO.object.length > 0)
    {
      resultDTO.object = resultDTO.object;
      resultDTO.hasSuccessfully = true;
    }

    return resultDTO;
  }

  public async getCategoryDB(idCategory: string): Promise<ResultDTO>
  {
    const urlRequest = `${envConfig.apiUrl}/categories/${idCategory}`;

    let resultDTO = new ResultDTO();

    resultDTO = await new Promise<ResultDTO>((result) =>
    {
      this.httpClient.get<Question>(urlRequest)
        .pipe(
          retry(3),
          catchError(err =>
          {
            return err;
          })
        )
        .subscribe({
          next: data =>
          {
            resultDTO.object = data;
            result(resultDTO);
          }
          , error: err =>
          {
            resultDTO = this._handleError(err);
            result(resultDTO);
          }
        })
    }).then(result =>
    {
      return result;
    })

    if (resultDTO.msgError === undefined && resultDTO.object != undefined)
    {
      resultDTO.object = resultDTO.object;
      resultDTO.hasSuccessfully = true;
    }

    return resultDTO;
  }

  public async saveCategoryDB(category: Category): Promise<ResultDTO>
  {
    const urlRequest = `${envConfig.apiUrl}/categories`;
    let resultRequestDTO: ResultDTO = new ResultDTO();
    resultRequestDTO = await new Promise<ResultDTO>((result) =>
      this.httpClient.post(urlRequest, category, { headers: this._httpHeaders })
        .pipe(
          retry(2),
          catchError(err =>
          {
            return err;
          })
        )
        .subscribe({
          next: data =>
          {
            resultRequestDTO.object = data;
            result(resultRequestDTO);
          },
          error: err =>
          {
            resultRequestDTO = this._handleError(err);
          }
        })
    ).then(result =>
    {
      return result;
    });

    if (resultRequestDTO.msgError === undefined && resultRequestDTO.object !== undefined)
    {
      resultRequestDTO.hasSuccessfully = true;
    }

    return resultRequestDTO;
  }

  public async updateCategoryDB(category: Category): Promise<ResultDTO>
  {
    const urlRequest = `${envConfig.apiUrl}/categories/${category.id}/`;

    let resultRequestDTO: ResultDTO = new ResultDTO();
    resultRequestDTO = await new Promise<ResultDTO>((result) =>
      this.httpClient.put(urlRequest, category, { headers: this._httpHeaders })
        .pipe(
          retry(2),
          catchError(err =>
          {
            return err;
          })
        )
        .subscribe({
          next: data =>
          {
            resultRequestDTO.object = data;
            result(resultRequestDTO);
          },
          error: err =>
          {
            resultRequestDTO = this._handleError(err);
          }
        })
    ).then(result =>
    {
      return result;
    });

    if (resultRequestDTO.msgError === undefined && resultRequestDTO.object !== undefined)
    {
      resultRequestDTO.hasSuccessfully = true;
    }

    if (resultRequestDTO.hasSuccessfully)
    {
      resultRequestDTO = await this._updateCategoryInQuestionsDB(category);
    }

    return resultRequestDTO;
  }

  public async getQuestionsDB(): Promise<ResultDTO>
  {
    const urlRequest = `${envConfig.apiUrl}/questions`;
    let resultDTO = new ResultDTO();

    resultDTO = await new Promise<ResultDTO>((result) =>
    {
      this.httpClient.get<Question[]>(urlRequest)
        .pipe(
          catchError(err =>
          {
            return err;
          })
        )
        .subscribe({
          next: data =>
          {
            resultDTO.object = data;
            result(resultDTO);
          }
          , error: err =>
          {
            resultDTO = this._handleError(err);
            result(resultDTO);
          }
        })

    }).then(result =>
    {
      return result;
    });

    if (resultDTO.msgError === undefined && resultDTO.object.length > 0)
    {
      resultDTO.object = resultDTO.object;
      resultDTO.hasSuccessfully = true;
    }

    return resultDTO;
  }

  public async getQuestionsDBByCategoryID(categoryId: string): Promise<ResultDTO>
  {
    const urlRequest = `${envConfig.apiUrl}/questions?categoryId=${categoryId}`;

    let resultDTO = new ResultDTO();

    resultDTO = await new Promise<ResultDTO>((result) =>
    {
      this.httpClient.get<Question>(urlRequest)
        .pipe(
          retry(3),
          catchError(err =>
          {
            return err;
          })
        )
        .subscribe({
          next: data =>
          {
            resultDTO.object = data;
            result(resultDTO);
          }
          , error: err =>
          {
            resultDTO = this._handleError(err);
            result(resultDTO);
          }
        })
    }).then(result =>
    {
      return result;
    })

    if (resultDTO.msgError === undefined && resultDTO.object != undefined)
    {
      resultDTO.object = resultDTO.object;
      resultDTO.hasSuccessfully = true;
    }

    return resultDTO;
  }

  public async getQuestionDB(idQuestion: string): Promise<ResultDTO>
  {
    const urlRequest = `${envConfig.apiUrl}/questions/${idQuestion}`;

    let resultDTO = new ResultDTO();

    resultDTO = await new Promise<ResultDTO>((result) =>
    {
      this.httpClient.get<Question>(urlRequest)
        .pipe(
          retry(3),
          catchError(err =>
          {
            return err;
          })
        )
        .subscribe({
          next: data =>
          {
            resultDTO.object = data;
            result(resultDTO);
          }
          , error: err =>
          {
            resultDTO = this._handleError(err);
            result(resultDTO);
          }
        })
    }).then(result =>
    {
      return result;
    })

    if (resultDTO.msgError === undefined && resultDTO.object != undefined)
    {
      resultDTO.object = resultDTO.object;
      resultDTO.hasSuccessfully = true;
    }

    return resultDTO;

  }

  public async saveQuestionDB(question: Question): Promise<ResultDTO>
  {
    const urlRequest = `${envConfig.apiUrl}/questions`;
    let resultRequestDTO: ResultDTO = new ResultDTO();
    resultRequestDTO = await new Promise<ResultDTO>((result) =>
      this.httpClient.post(urlRequest, question, { headers: this._httpHeaders })
        .pipe(
          retry(2),
          catchError(err =>
          {
            return err;
          })
        )
        .subscribe({
          next: data =>
          {
            resultRequestDTO.object = data;
            result(resultRequestDTO);
          },
          error: err =>
          {
            resultRequestDTO = this._handleError(err);
          }
        })
    ).then(result =>
    {
      return result;
    });

    if (resultRequestDTO.msgError === undefined && resultRequestDTO.object !== undefined)
    {
      resultRequestDTO.hasSuccessfully = true;
    }

    return resultRequestDTO;
  }

  public async updateQuestionDB(question: Question): Promise<ResultDTO>
  {
    const urlRequest = `${envConfig.apiUrl}/questions/${question.id}/`;

    let resultRequestDTO: ResultDTO = new ResultDTO();
    resultRequestDTO = await new Promise<ResultDTO>((result) =>
      this.httpClient.put(urlRequest, question, { headers: this._httpHeaders })
        .pipe(
          retry(2),
          catchError(err =>
          {
            return err;
          })
        )
        .subscribe({
          next: data =>
          {
            resultRequestDTO.object = data;
            result(resultRequestDTO);
          },
          error: err =>
          {
            resultRequestDTO = this._handleError(err);
          }
        })
    ).then(result =>
    {
      return result;
    });

    if (resultRequestDTO.msgError === undefined && resultRequestDTO.object !== undefined)
    {
      resultRequestDTO.hasSuccessfully = true;
    }

    return resultRequestDTO;
  }

  private async _updateCategoryInQuestionsDB(category: Category): Promise<ResultDTO>
  {
    let resultDTO: ResultDTO = new ResultDTO();
    resultDTO = await this.getQuestionsDBByCategoryID(category.id);

    if (!resultDTO.hasSuccessfully)
    {
      return resultDTO;
    }

    let questions: Question[] = resultDTO.object;

    questions.forEach(q =>
    {
      q.categoryId = category.id;
      q.categoryDesc = category.desc;
    });

    let resultUpdate: ResultDTO = new ResultDTO();
    resultUpdate.hasSuccessfully = true;

    questions.forEach(async (q) =>
    {
      if (resultUpdate.hasSuccessfully)
      {
        resultUpdate = await this.updateQuestionDB(q)
      } else
      {
        resultUpdate.msgError = "Erro durante a atualização das questões";
      }
    })

    return resultUpdate;

  }

}
