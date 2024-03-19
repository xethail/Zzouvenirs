import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../test.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styles: ``
})
export class ConnexionComponent {

  compte : any = {username : "", password : ""};
  password_confirm : string = "";
  sent : boolean = false;
  response : any;

  constructor(private router : Router, private data: TestService) {}

  goBack() : void
  {
    this.router.navigate(['home']);
  }

  onSubmit(): void {
    this.data.postConnectAccount(this.compte.username, this.compte.password).subscribe(
      (response: any) => {
        localStorage.setItem('token', response); // Stockez le token JWT dans le local storage
        console.log('Token JWT reçu:', response);
        this.router.navigate(['liste']);
        // Redirigez l'utilisateur vers une autre page ou effectuez d'autres actions nécessaires
      },
      (error: any) => {
        console.error('Erreur lors de la connexion:', error);
        // Gérez les erreurs ici si nécessaire
      }
    );
  }
  

}
