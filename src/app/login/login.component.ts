import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService) {}

  login(): void {
    const credentials = { username: this.username, password: this.password };
    this.authService.login(credentials).subscribe((user: any) => {
      this.authService.setCurrentUser(user);
    });
  }
}

