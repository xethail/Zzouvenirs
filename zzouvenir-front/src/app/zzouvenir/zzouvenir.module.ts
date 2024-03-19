import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeArticleComponent } from './liste-article/liste-article.component';
import { RouterModule, Routes } from '@angular/router';
import { ArticleBorderDirective } from './article-border.directive';
import { ChipPipe } from './chip.pipe';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { FormsModule } from '@angular/forms';
import { ConnexionComponent } from './connexion/connexion.component';

const zzouvenirroutes: Routes = [
  { path: 'liste', component: ListeArticleComponent},
  { path: 'liste/:id', component: ArticleDetailsComponent},
  { path: 'addarticle', component: AddArticleComponent},
  { path: 'connexion', component: ConnexionComponent}
];

@NgModule({
  declarations: [ListeArticleComponent, ArticleBorderDirective, ChipPipe, ArticleDetailsComponent, AddArticleComponent, ConnexionComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(zzouvenirroutes)
  ]
})
export class ZzouvenirModule { }
