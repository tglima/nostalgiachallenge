import { User } from '../core/model';
import { Session } from '../core/model';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { ResultDTO, Util } from '../core/project-core';
import { environment as envConfig } from 'src/environments/environment';


@Injectable(
  {
    providedIn: 'root'
  })

export class AuthService
{

  constructor(private apiService: ApiService) { }

  public isAuthenticated(): boolean
  {
    if (localStorage.getItem("session"))
    {
      let session: Session = JSON.parse(localStorage.getItem("session")!);
      return session != undefined && session.id != undefined;
    }
    return false;
  }

  public async isValidUserPassword(username: string, password: string): Promise<ResultDTO>
  {
    return await this.apiService.getUserFromLogin(username, password);
  }

  public async isValidSessionUser(): Promise<boolean>
  {
    let session: Session = JSON.parse(localStorage.getItem("session")!);

    if (session != undefined)
    {
      const idUser = session.idUser!;
      const idSession = session.id!;
      const isValidSessionUser = await this._checkIsValidSessionUser(idUser, idSession);
      return isValidSessionUser;
    }
    return false;
  }

  public async saveSession(user: User): Promise<void>
  {
    const dateStart = new Date();
    let dateExpiration = Util.GetDateMinutesFuture(envConfig.timeExpiration);

    let session: Session = new Session();
    session.idUser = user.id;
    session.dateStart = dateStart;
    session.dateExpiration = dateExpiration;

    this.apiService.finishAllSessionUserDB(user!.id);

    let resultDTO: ResultDTO =
      await this.apiService.saveSessionDB(session);

    if (resultDTO.hasSuccessfully)
    {
      session = resultDTO.object;
      localStorage.setItem("session", JSON.stringify(session));
    }
  }

  public async finishSessionUser()
  {
    const session: Session = JSON.parse(localStorage.getItem("session")!);
    let resultDTO: ResultDTO = await this.apiService.finishAllSessionUserDB(session.idUser!);

    if (resultDTO.hasSuccessfully)
    {
      localStorage.clear();
    }
  }

  private async _checkIsValidSessionUser(idUser: string, idSession: string): Promise<boolean>
  {
    let resultGetSessions = await this.apiService.getSessionsUser(idUser);
    let resultDTO: ResultDTO = new ResultDTO();

    if (resultGetSessions.object !== undefined && resultGetSessions.object.length > 0)
    {
      let sessions: Session[] = resultGetSessions.object;
      sessions = resultGetSessions.object;

      sessions.forEach(
        (session: Session) =>
        {
          const dateNow = new Date().valueOf();

          const timeExp: number = new Date(session.dateExpiration).valueOf();

          if (session!.id === idSession && timeExp >= dateNow)
          {
            this._updateTimeExpirationSession(session)
            resultDTO.hasSuccessfully = true;
          }

        });
    }
    return resultDTO.hasSuccessfully;
  }

  private async _updateTimeExpirationSession(session: Session): Promise<Session>
  {
    session.dateExpiration = Util.GetDateMinutesFuture(envConfig.timeExpiration);

    const resultDTO = await this.apiService.updateSessionDB(session);

    if (resultDTO.hasSuccessfully)
    {
      localStorage.clear();
      session = resultDTO.object;
      localStorage.setItem("session", JSON.stringify(session));
    }
    return session;
  }

}