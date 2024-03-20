import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../test.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styles: ``
})
export class AddArticleComponent {

  titre : string = "test";
  prix: number = 0;
  comment: string = "desc";
  ordre: number = 0;
  srcImage : string = "cat-2.jpg";

  selectedFile: File | null = null;

  constructor(private http: HttpClient, private router: Router, private data : TestService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  postArticle() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('article', JSON.stringify({
      titre: this.titre,
      prix: this.prix,
      comment: this.comment,
      ordre: this.ordre
    }));

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.data.token // Utilisation du token JWT dans l'en-tête d'authentification
    });
    
    this.http.post(`http://localhost:8080/api/articles`, formData, { headers: headers })
      .subscribe(
        response => {
          console.log('Upload successful', response);
          // Traitez la réponse ici si nécessaire
        },
        error => {
          console.error('Upload failed', error);
          // Gérez l'erreur ici si nécessaire
        }
      );
      this.router.navigate(['liste']);
  }

  goBack()
  {
    this.router.navigate(['liste']);
  }

}
