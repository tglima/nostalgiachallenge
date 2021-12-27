import { Category } from '../core/model';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { ResultDTO } from '../core/project-core';

@Injectable(
  {
    providedIn: 'root'
  })

export class CategoryService
{

  constructor(private apiService: ApiService)
  { }

  async getCategories(): Promise<Category[]>
  {
    let arrayDefault: Category[] = [];
    let resultDTO: ResultDTO = await this.apiService.getCategoriesDB();

    if (resultDTO.hasSuccessfully && resultDTO.object !== undefined)
    {
      let categories = resultDTO.object;
      return categories;
    }

    return arrayDefault;
  }

  async getCategoryById(idCategory: string): Promise<ResultDTO>
  {
    return (await this.apiService.getCategoryDB(idCategory))
  }

  async saveNewCategory(category: Category): Promise<ResultDTO>
  {
    return (await this.apiService.saveCategoryDB(category));
  }

  async updateCategory(category: Category): Promise<ResultDTO>
  {
    return (await this.apiService.updateCategoryDB(category));
  }

}
