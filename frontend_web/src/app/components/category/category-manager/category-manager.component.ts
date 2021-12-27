import { Category } from '../../../core/model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Util, Status, ResultDTO } from '../../../core/project-core';
import { CategoryService } from 'src/app/services/category.service';

@Component(
  {
    selector: 'app-category-manager',
    templateUrl: './category-manager.component.html',
    styleUrls: ['./category-manager.component.scss']
  })

export class CategoryManagerComponent implements OnInit
{

  status = Status;
  statusForm = Status.initial;
  form!: FormGroup;
  OptionsYesNo = Util.GetOptionsYesNo();

  constructor
    (
      private formBuilder: FormBuilder,
      private categoryService: CategoryService,
      private router: Router,
      private route: ActivatedRoute
    ) { }

  ngOnInit(): void
  {
    this._setValidatorsForm();

    if (this.router.url != "/category/add")
    {
      this._checkRouteParams();
    }
  }

  private _checkRouteParams(): void
  {
    this.route.params.subscribe(
      (param: Params) =>
      {
        this.categoryService.getCategoryById(param['id'])
          .then((qnResult: ResultDTO) =>
          {
            if (qnResult.hasSuccessfully)
            {
              this._setValuesForm(qnResult.object);
            }
            else
            {
              this.router.navigateByUrl("/badRequest");
            }
          })
          .catch((err) =>
          {
            console.error('Error ao carregar a Category: \n', err);
            this.router.navigateByUrl("/badRequest");
          })
      }
    )
  }

  private _setValuesForm(category: Category): void
  {
    this.form.patchValue(
      {
        id: category.id,
        desc: category.desc,
        isActive: category.isActive
      })
  }

  private _setValidatorsForm(): void
  {
    this.form = this.formBuilder.group(
      {
        id: [null],
        desc: [null,
          [Validators.required,
          Validators.minLength(4),
          Validators.pattern('[0-9A-zÀ-ž ]+')]],
        isActive: [null, [Validators.required]]
      });
  }

  public formatInput(inputText: string): void
  {
    if (this.form!.get(inputText)?.valid)
    {
      const text: string = this.form!.get(inputText)!.value;
      this.form.patchValue(
        {
          [inputText]: Util.FrmTxtRemoveDoubleSpace(text)
        }
      );
    }
  }

  public refreshComponent()
  {
    this.router.navigate(['/category/add']);
  }

  public async onSubmit(): Promise<void>
  {
    this.statusForm = this.status.load;

    let id =
      (this.form.value.id === undefined || this.form.value.id === null) ?
        "" : this.form.value.id;

    let category = new Category(this.form.value.desc, this.form.value.isActive, id);

    let resultDTO: ResultDTO = new ResultDTO();

    if (id === "")
    {
      resultDTO = await this.categoryService.saveNewCategory(category);
    }
    else
    {
      resultDTO = await this.categoryService.updateCategory(category);
    }


    if (resultDTO.hasSuccessfully)
    {
      this.statusForm = this.status.success;
      return;
    }

    this.statusForm = this.status.error;
  }


}
