import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../test.service';
import { Article } from '../article';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styles: ``
})
export class ArticleDetailsComponent {

  article : Article|undefined;

  constructor(private activeroute: ActivatedRoute, private router: Router, private data: TestService) {}

  ngOnInit() : void
  {
    const id: string|null = this.activeroute.snapshot.paramMap.get('id'); // On récupère la propriété de l'URL

    if(id)
    {
      this.article = this.data.tab.find( article => article.id  == +id); // On récupère l'élément correspondant à la propriété
    }
  }

  goBack() : void
  {
    this.router.navigate(['liste']);
  }

}
