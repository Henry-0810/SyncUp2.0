import { OnInit, Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Sync Up';
  currentUser: any;
  loggedIn: boolean = false;
  
  constructor(private authService: AuthenticationService) {}

  logout(): void {
    this.authService.logout();
    this.loggedIn = false;
  }

  setLoggedIn(): void {
    this.loggedIn = true;
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user: any) => {
      this.currentUser = user;
    });
  }
}