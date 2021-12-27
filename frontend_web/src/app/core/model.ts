export class Answer
{

  public desc: string;
  public isCorrect: boolean;

  constructor(desc: string, isCorrect: boolean)
  {
    this.desc = desc;
    this.isCorrect = isCorrect;
  }

}

export class Category
{
  public readonly id: string;
  public desc: string;
  public isActive: boolean;

  constructor(desc: string, isActive: boolean, id: string)
  {
    this.desc = desc;
    this.isActive = isActive;
    this.id = id;
  }

  static orderByDesc(categories: Category[]): Category[]
  {
    categories = categories.sort((a, b) =>
    {
      return a.desc.localeCompare(b.desc);
    });
    return categories;
  }
}


export class Question
{
  public readonly id: string;
  public categoryId: string;
  public categoryDesc: string;
  public desc: string;
  public level: number;
  public isActive: boolean;
  public answers: Array<Answer> = [];

  constructor(
    { categoryId, categoryDesc, desc, level, answers, id, isActive }:
      { categoryId: string, categoryDesc: string, desc: string, level: number, answers: Array<Answer>, id: string, isActive: boolean })
  {
    this.id = id;
    this.answers = answers;
    this.categoryId = categoryId;
    this.categoryDesc = categoryDesc;
    this.desc = desc;
    this.level = level;
    this.isActive = isActive;
  }

  static orderByCategoryDescAndLevel(questions: Question[]): Question[]
  {
    questions = questions.sort((a, b) =>
    {
      return a.categoryDesc.localeCompare(b.categoryDesc) || a.level - b.level;
    })

    return questions;
  }

}
export class Session
{
  public readonly id?: string;
  idUser?: string;
  dateStart?: Date;
  dateExpiration!: Date;

  constructor(id: string = "") { }

}
export class User
{
  private _id: string;
  public levelRole: number;
  public name: string;
  private _password: string;
  public username: string;
  public isActive: boolean;

  constructor(name: string, password: string, username: string, isActive: boolean = true, levelRole: number = 10, id: string = "")
  {
    this._id = id;
    this.levelRole = levelRole;
    this.name = name;
    this._password = password;
    this.username = username;
    this.isActive = isActive;
  }

  get id(): string
  {
    return this._id;
  }

  get password(): string
  {
    return this._password;
  }

}
