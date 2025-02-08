import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit() {
  }


  login(): void {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }
}

