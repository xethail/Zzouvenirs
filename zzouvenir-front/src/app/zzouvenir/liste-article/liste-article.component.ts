import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../article';
import { TestService } from '../test.service';

@Component({
  selector: 'app-liste-article',
  templateUrl: './liste-article.component.html',
  styles: ``
})
export class ListeArticleComponent {
  liste: Article[] = [];

  constructor(private router: Router, private data: TestService) { this.liste = this.data.tab; }

  ngOnInit() 
  {
    this.liste = this.data.tab;
  }

  goToArticle(article : Article)
  {
    this.router.navigate(['liste', article.id]);
  }

}
