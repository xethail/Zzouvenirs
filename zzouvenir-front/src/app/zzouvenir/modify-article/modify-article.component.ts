import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../test.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-modify-article',
  templateUrl: './modify-article.component.html',
  styles: ``
})
export class ModifyArticleComponent {
  id : string|null;
  imgSrc : string; //
  imgLoaded : boolean = false;

  titre : string = "test";
  prix: number = 0;
  comment: string = "desc";
  ordre: number = 0;
  srcImage : string = "cat-2.jpg";

  selectedFile: File | null = null;

  constructor(private http: HttpClient, private router: Router, private data : TestService, private activeroute : ActivatedRoute) {}

  ngOnInit() {
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
        this.titre = article.titre;
        this.prix = article.prix;
        this.comment = article.comment;
        this.ordre = article.ordre;
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  async getImageAsFile(imageUrl: string): Promise<File> {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Erreur lors du téléchargement de l'image: ${response.statusText}`);
    }
    const blob = await response.blob();
    return new File([blob], 'image.jpg', { type: 'image/jpeg' });
  }   

  async putArticle() {
    const formData = new FormData();
  
    if (this.selectedFile) {
      // Si une image est sélectionnée, téléversez-la
      formData.append('image', this.selectedFile);
    } else {
      // Si aucune image n'est sélectionnée, conservez l'URL de l'image existante
      try {
        const imgFile = await this.getImageAsFile(this.imgSrc);
        formData.append('image', imgFile);
      } catch (error) {
        console.error(error);
        return;
      }
    }
  
    formData.append('article', JSON.stringify({
      titre: this.titre,
      prix: this.prix,
      comment: this.comment,
      ordre: this.ordre
    }));
  
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.data.token // Utilisation du token JWT dans l'en-tête d'authentification
    });
  
    this.http.put(`http://localhost:8080/api/articles/${this.id}`, formData, { headers: headers })
      .subscribe(
        response => {
          console.log('Modification réussie', response);
          // Traitez la réponse ici si nécessaire
        },
        error => {
          console.error('Échec de la modification', error);
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
