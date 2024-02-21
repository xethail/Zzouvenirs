import { Injectable } from '@angular/core';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  public tab: Article[] = [];

  constructor() {
    this.initializeTab();
  }

  private initializeTab() {
    for (let i = 0; i < 5; i++) {
      this.tab[i] = {
        id: i,
        title: "Article " + i,
        comment: "Description",
        price: i * 5,
      };
    }
  }
}
