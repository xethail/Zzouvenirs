import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeArticleComponent } from './liste-article/liste-article.component';
import { RouterModule, Routes } from '@angular/router';
import { ArticleBorderDirective } from './article-border.directive';
import { ChipPipe } from './chip.pipe';
import { ArticleDetailsComponent } from './article-details/article-details.component';

const zzouvenirroutes: Routes = [
  { path: 'liste', component: ListeArticleComponent},
  { path: 'liste/:id', component: ArticleDetailsComponent}
];

@NgModule({
  declarations: [ListeArticleComponent, ArticleBorderDirective, ChipPipe, ArticleDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(zzouvenirroutes)
  ]
})
export class ZzouvenirModule { }
