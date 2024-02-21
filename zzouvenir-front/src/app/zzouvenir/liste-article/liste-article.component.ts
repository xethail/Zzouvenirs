import { Component } from '@angular/core';
import { Article } from '../article';
import { TestService } from '../test.service';

@Component({
  selector: 'app-liste-article',
  templateUrl: './liste-article.component.html',
  styles: ``
})
export class ListeArticleComponent {
  liste: Article[] = [];

  constructor(private data: TestService) {}

  ngOnInit() 
  {
    this.liste = this.data.tab;
  }

}
