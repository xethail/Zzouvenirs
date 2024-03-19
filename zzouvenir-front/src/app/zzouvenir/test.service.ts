import { Injectable } from '@angular/core';
import { Article } from './article';
import { Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  username: string; 
  password: string;
  public token : string;

  constructor(private http : HttpClient) {}

  // Méthode pour obtenir un article par son ID
  getArticle(id: string | null, headers?: HttpHeaders): Observable<{ article: any, imageUrl: string }> {
    // Utiliser les en-têtes fournis s'ils sont disponibles, sinon utiliser les en-têtes par défaut avec le token JWT
    if (!headers) {
      headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      });
    }
  
    // Faire la requête pour récupérer l'article
    return this.http.get<any>(`http://localhost:8080/api/articles/${id}`, { headers: headers }).pipe(
      switchMap((response: any) => {
        // Construire l'URL de l'image avec le token JWT inclus
        const imageUrl = `http://localhost:8080/api/articles/${id}/image?token=${this.token}`;
        // Retourner à la fois l'article et l'URL de l'image
        return of({ article: response, imageUrl: imageUrl });
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération de l\'article:', error);
        return throwError(error);
      })
    );
  }

  
  getImage(id: string): Observable<Blob> {
    if (!this.token) {
      console.error('Token manquant. Connectez-vous d\'abord.');
      return throwError('Token manquant. Connectez-vous d\'abord.');
    }
  
    // Construire l'URL de l'image
    const imageUrl = `http://localhost:8080/api/articles/${id}/image`;
  
    // Construire les en-têtes HTTP avec le token JWT
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
  
    // Faire la requête HTTP pour récupérer l'image avec les en-têtes personnalisés
    return this.http.get(imageUrl, { headers: headers, responseType: 'blob' });
  }
  


  // Méthode pour obtenir tous les articles
  getArticles(): Observable<any> {
    // Vérifier si le token est défini
    console.log("Token : ", this.token)
    if (!this.token) {
      console.error('Token manquant. Connectez-vous d\'abord.');
      return throwError('Token manquant. Connectez-vous d\'abord.');
    }

    // Ajouter le token à l'en-tête d'autorisation
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.get<any>('http://localhost:8080/api/articles', { headers: headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des articles:', error);
        return throwError('Erreur lors de la récupération des articles.');
      })
    );
  }

  // Méthode pour ajouter un article
  postArticle(imageFile: File, article: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', imageFile);
    formData.append('article', JSON.stringify(article));
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token // Utilisation du token JWT dans l'en-tête d'authentification
    });
    return this.http.post<any>('http://localhost:8080/api/articles', formData, { headers: headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'ajout de l\'article:', error);
        return throwError(error);
      })
    );
  }

  // Méthode pour supprimer un article
  deleteArticle(id: string | null): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token // Utilisation du token JWT dans l'en-tête d'authentification
    });
    return this.http.delete<any>(`http://localhost:8080/api/articles/${id}`, { headers: headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de la suppression de l\'article:', error);
        return throwError(error);
      })
    );
  }

  postConnectAccount(username: string, password: string): Observable<any> {
    this.username = username;
    this.password = password;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
    });
  
    const body = {};
  
    return this.http.post<any>('http://localhost:8080/login', body, { headers: headers, responseType: 'text' as 'json' }).pipe(
      tap((response: string) => {
        // Extraire le token de la réponse
        this.token = response;
        console.log("token : ", this.token);
  
        // // Stocker le token dans l'attribut token du service
        // this.token = token;
      }),
      catchError(error => {
        console.error('Erreur lors de la connexion:', error);
        return throwError(error);
      })
    );
  }
  
}
