import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable(
  {
    providedIn: 'root'
  })

export class AuthGuard implements CanActivate
{

  constructor(private router: Router, private auth: AuthService) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>
  {
    const isValidSession: boolean = (await this.auth.isValidSessionUser()).valueOf();

    if (isValidSession)
    {

      if (state.url === 'login')
      {
        this.router.navigateByUrl("");
      }

      return true;
    }
    else
    {
      this.router.navigate(['/login']);
      localStorage.clear();
      return false;
    }
  }


}