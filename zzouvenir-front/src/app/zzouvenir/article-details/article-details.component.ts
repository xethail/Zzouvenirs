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

  article : any;
  imgSrc : string; //
  id : string|null;

  constructor(private activeroute: ActivatedRoute, private router: Router, private data: TestService) {}

  ngOnInit() : void
  {
    this.id = this.activeroute.snapshot.paramMap.get('id'); // On récupère la propriété de l'URL

    this.data.getArticle(this.id).subscribe(
      (response: any) => {
        this.article = response;
        console.log("article : ", this.article);
        this.imgSrc = `http://localhost:8080/api/articles/${this.article.id}/image`;
        //console.log("Liste : ", this.liste);
      }
    );
  }

  goBack() : void
  {
    this.router.navigate(['liste']);
  }

  deleteArticle() : void {
    this.data.deleteArticle(this.id).subscribe(
      (response: any) => {
        this.router.navigate(['liste']);
       // console.log("Liste : ", response);
      }
    );
  }

}
