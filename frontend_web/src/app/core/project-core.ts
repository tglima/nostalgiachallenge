export class ResultDTO
{
  hasSuccessfully: boolean = false;
  msgError?: string;
  object?: any;
}

export class Util
{
  static FrmTxtRemoveDoubleSpace(text: string): string
  {
    text = text.replace(/\s{2,}/g, ' ').trim();
    text = text.replace(/\n{2,}/g, '\n');
    return text;
  }

  static GetDateMinutesFuture(minutes: number)
  {
    const dateNow: Date = new Date();
    let numberAux: number = new Date().setMinutes(dateNow.getMinutes() + minutes);
    let dateResult: Date = new Date(numberAux);
    return dateResult;
  }

  static GetOptionsYesNo(): Map<boolean, string>
  {
    let options = new Map<boolean, string>();
    options.set(false, "Não");
    options.set(true, "Sim");
    return options;
  }
}

export enum Status
{
  initial = 0,
  load = 1,
  success = 2,
  error = 99
}

export enum Role
{
  root = 0,
  admin = 10,
  user = 99
}