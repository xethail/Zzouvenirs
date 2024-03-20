import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../test.service';
import { Article } from '../article';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styles: ``
})
export class ArticleDetailsComponent {

  article : any;
  imgSrc : string; //
  imgLoaded : boolean = false;
  id : string|null;
  //http: any;

  constructor(private activeroute: ActivatedRoute, private router: Router, private data: TestService, private http : HttpClient) {}

  ngOnInit(): void {
    this.id = this.activeroute.snapshot.paramMap.get('id'); // On récupère la propriété de l'URL
  
    // Récupérer le token JWT du service
    const token = this.data.token;
  
    // Vérifier si le token JWT est disponible
    if (!token) {
      console.error('Token manquant. Connectez-vous d\'abord.');
      // Gérer l'absence de token, par exemple, rediriger vers la page de connexion
      return;
    }
  
    // Construire les en-têtes HTTP avec le token JWT
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  
    // Faire la requête pour récupérer l'article avec les en-têtes personnalisés
    this.data.getArticle(this.id, headers).subscribe(
      ({ article, imageUrl }: { article: any, imageUrl: string }) => {
        this.article = article;
        this.imgSrc = imageUrl;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération de l\'article:', error);
        // Gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur
      }
    );
    
    this.http.get(`http://localhost:8080/api/articles/${this.id}/image`, {
      headers,
      responseType: 'blob' // Indique au HttpClient de traiter la réponse comme un Blob
    }).subscribe((response: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imgSrc = reader.result as string; // Définit la source de l'image avec les données de l'image
        this.imgLoaded = true; // Indique que l'image est chargée et peut être affichée
      };
      reader.readAsDataURL(response); // Lit les données de l'image sous forme d'URL de données
    }, (error) => {
      console.error('Erreur lors de la récupération de l\'image :', error);
    });


  }  
  

  goBack() : void
  {
    this.router.navigate(['liste']);
  }

  goToModifyArticle() : void {
    this.router.navigate(['modifyarticle', this.id]);
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
