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
  liste: any;
  response : any;

  titre : string = "test";
  prix: number = 0;
  comment: string = "desc";
  ordre: number = 0;
  intervalId? : number;
  imgSrc : string;

  constructor(private router: Router, private data: TestService) { }

  ngOnInit() 
  {
    this.liste = this.data.tab;

    if(typeof window !== 'undefined')
    {
      this.intervalId = window.setInterval( () => {
        this.data.getArticles().subscribe(
          (response: any) => {
            this.liste = response;
            console.log("Liste : ", this.liste);
          }
        );
      }, 3000); // Refresh toutes les 3 secondes
    } 

  }

  ngOnDestroy() : void {
    if(this.intervalId) { clearInterval(this.intervalId); }
  }


  goToArticle(article : Article)
  {
    this.router.navigate(['liste', article.id]);
  }

  goToAddArticle()
  {
    this.router.navigate(['addarticle']);
  }

}
