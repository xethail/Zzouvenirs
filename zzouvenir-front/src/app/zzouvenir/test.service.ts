import { Injectable } from '@angular/core';
import { Article } from './article';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  public tab: Article[] = [];

  constructor(private http : HttpClient) {
    this.initializeTab();
  }

  private initializeTab() {
    for (let i = 0; i < 15; i++) {
      this.tab[i] = {
        id: i,
        title: "Article " + i,
        comment: "Description",
        price: i * 8,
      };
    }
  }

  getArticle(id : string|null): Observable<any> {
    //return this.http.get<any>('/api/articles')
    return this.http.get<any>(`http://localhost:8080/api/articles/${id}`)
  }

  getArticles(): Observable<any> {
    //return this.http.get<any>('/api/articles')
    return this.http.get<any>('http://localhost:8080/api/articles')
  }

  // postArticle(body : any): Observable<any> {
  //   //return this.http.get<any>('/api/articles')
    
  //   return this.http.post<any>('http://localhost:8080/api/articles', body)
  // }

  postArticle(imageFile: File, article: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', imageFile);
    formData.append('article', JSON.stringify(article));
    return this.http.post<any>('http://localhost:8080/api/articles', formData);
  }

  deleteArticle(id : string|null): Observable<any> {
    //return this.http.get<any>('/api/articles')
    return this.http.delete<any>(`http://localhost:8080/api/articles/${id}`)
  }
}
