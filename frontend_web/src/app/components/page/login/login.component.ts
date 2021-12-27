import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ResultDTO } from '../../../core/project-core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component(
  {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })

export class LoginComponent implements OnInit
{
  form!: FormGroup;
  hasError: boolean = false;
  msgError: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService)
  {
    if (this.router.url === "/logout")
    {
      this.authService.finishSessionUser();
      this.router.navigateByUrl("/login");
      return;
    }
  }

  ngOnInit(): void
  {
    this.form
    this.form = this.formBuilder.group(
      {
        username: [null, [Validators.required, Validators.minLength(5), Validators.pattern('[0-9A-z.]+')]],
        password: [null, [Validators.required, Validators.minLength(6)]]
      });
  }

  async onSubmit(): Promise<void>
  {
    let resultDTO: ResultDTO =
      await this.authService.isValidUserPassword(
        this.form.value.username, this.form.value.password);

    if (resultDTO.hasSuccessfully)
    {
      if (resultDTO.object !== undefined)
      {
        await this.authService.saveSession(resultDTO.object);

        this.router.navigateByUrl("home");
      }
      else
      {
        this.hasError = true;
        this.msgError = "Ocorreu um erro e não foi possível continuar!"
      }

    }
    if (!resultDTO.hasSuccessfully)
    {
      this.hasError = true;

      if (resultDTO.msgError === undefined)
      {
        this.msgError = "Usuário ou senha inválida!"
      }
      else
      {
        this.msgError = "Ocorreu um erro e não foi possível continuar!"
      }
    }
  }
}