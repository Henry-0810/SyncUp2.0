import { OnInit, Component, DoCheck } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'Sync Up';
  currentUser: any;
  loggedIn: boolean = false;
  
  constructor(public authService: AuthenticationService) {}

  logout(): void {
    this.authService.logout();
    this.loggedIn = false;
  }

  setLoggedIn(): void {
    this.loggedIn = true;
  }
}