import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, MatIconModule, RouterModule],
templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  email = '';
  password = '';
  name = '';
  surname = '';
  number = '';
  rememberMe = false;
  showPassword = false;
  isLoading = false;
  constructor(private userService:UserService) {}

  onRegister() {
    const payload = {
      firstname: this.name,
      lastname: this.surname,
      email: this.email,
      password: this.password,
    };

    this.userService.register(payload).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('Registratsiya muvaffaqiyatli!');
        }
      },
      error: (err) => {
        console.error('Xatolik:', err);
      }
    });
  }}
