import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Answer, Category, Question } from '../../../core/model';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Util, Status, ResultDTO } from '../../../core/project-core';

@Component(
  {
    selector: 'app-question-manager',
    templateUrl: './question-manager.component.html',
    styleUrls: ['./question-manager.component.scss']
  })

export class QuestionManagerComponent implements OnInit
{

  status = Status;
  statusForm = Status.initial;
  form!: FormGroup;
  categories: Category[] = [];
  levels: number[] = [1, 2, 3, 4];
  OptionsYesNo = Util.GetOptionsYesNo();

  constructor
    (
      private formBuilder: FormBuilder,
      private categoryService: CategoryService,
      private questionService: QuestionService,
      private router: Router,
      private route: ActivatedRoute
    ) { }

  ngOnInit(): void
  {
    this._loadCategories();
    this._setValidatorsForm();

    if (this.router.url !== "/question/add")
    {
      this._checkRouteParams()
    }

  }

  private async _loadCategories(): Promise<void>
  {
    this.categories = await this.categoryService.getCategories();
  }

  private _setValidatorsForm(): void
  {
    this.form = this.formBuilder.group({
      id: [null],
      desc: [null, [Validators.required, Validators.minLength(4),
      Validators.maxLength(120)]],
      level: [null, [Validators.required, Validators.min(1)]],
      category: [null, [Validators.required]],
      answer1: [null, [Validators.required, Validators.minLength(1),
      Validators.maxLength(60)]],
      answer2: [null, [Validators.required, Validators.minLength(1),
      Validators.maxLength(60)]],
      answer3: [null, [Validators.required, Validators.minLength(1),
      Validators.maxLength(60)]],
      answer4: [null, [Validators.required, Validators.minLength(1),
      Validators.maxLength(60)]],
      isActive: [null, [Validators.required]]
    });
  }

  private _checkRouteParams(): void
  {
    this.route.params.subscribe(
      (param: Params) =>
      {
        this.questionService.getQuestionByID(param['id'])
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
            console.error('Error ao carregar a pergunta: \n', err);
            this.router.navigateByUrl("/badRequest");
          })
      }
    )
  }

  private _setValuesForm(question: Question): void
  {
    this.form.patchValue({
      id: question.id,
      desc: question.desc,
      level: question.level,
      isActive: question.isActive,
      category: question.categoryId,
      answer1: question.answers[0].desc,
      answer2: question.answers[1].desc,
      answer3: question.answers[2].desc,
      answer4: question.answers[3].desc
    })
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
    this.router.navigate(['/question/add']);
  }

  public async onSubmit(): Promise<void>
  {
    this.statusForm = this.status.load;
    let id =
      (this.form.value.id === undefined || this.form.value.id === null) ?
        "" : this.form.value.id;

    let answers = new Array<Answer>();
    answers.push(new Answer(this.form.value.answer1, true));
    answers.push(new Answer(this.form.value.answer2, false));
    answers.push(new Answer(this.form.value.answer3, false));
    answers.push(new Answer(this.form.value.answer4, false));

    const idCat: string = this.form.value.category;

    let category = this.categories.find((c) =>
    {
      return c.id === idCat;
    });

    if (category === undefined)
    {
      this.statusForm = this.status.error;
      return
    }

    let question = new Question
      (
        {
          categoryId: category!.id,
          categoryDesc: category!.desc,
          desc: this.form.value.desc,
          level: this.form.value.level,
          answers: answers,
          id: id,
          isActive: this.form.value.isActive
        }
      );

    let resultDTO: ResultDTO = new ResultDTO();

    if (id === "")
    {
      resultDTO = await this.questionService.saveNewQuestion(question);
    }
    else
    {
      resultDTO = await this.questionService.updateQuestion(question);
    }

    if (resultDTO.hasSuccessfully)
    {
      this.statusForm = this.status.success;
      return;
    }

    this.statusForm = this.status.error;
  }

}
