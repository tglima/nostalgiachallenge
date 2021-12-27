import { Category } from '../../../core/model';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component(
  {
    selector: 'app-list-category',
    templateUrl: './list-category.component.html',
    styleUrls: ['./list-category.component.scss']
  })

export class ListCategoryComponent implements OnInit
{

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void
  {
    this._loadCategories();
  }

  private async _loadCategories(): Promise<void>
  {
    this.categories =
      Category.orderByDesc(
        (await this.categoryService.getCategories()));
  }
}
