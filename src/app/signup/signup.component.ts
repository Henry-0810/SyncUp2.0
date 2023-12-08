import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  first_name: string = '';
  last_name: string = '';
  birthday: Date = new Date();
  gender: string = '';

  constructor(private authService: AuthenticationService) {}

  register(): void {
    const credentials = {
      username: this.username,
      password: this.password,
      first_name: this.first_name,
      last_name: this.last_name,
      birthday: this.birthday,
      gender: this.gender
    };
  
    this.authService.register(credentials).subscribe((user: any) => {
      this.authService.setCurrentUser(user);
    });
  }
}
