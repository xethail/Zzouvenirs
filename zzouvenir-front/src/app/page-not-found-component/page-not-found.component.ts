import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styles: ``
})
export class PageNotFoundComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}
  
  BackToMenu() : void 
  {
    this.router.navigate(['liste']);
  }
}
