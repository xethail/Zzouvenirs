import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found.component';
import { ConnexionComponent } from './zzouvenir/connexion/connexion.component';

const routes: Routes = [
  { path: '', component: ConnexionComponent, pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent } // ** permet de dire toutes les routes non-traités donc qui n'existe pas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
