import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, MatIconModule, RouterModule,ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userService = inject(UserService);
  messageService = inject(MessageService);
  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  isLoading = false;

  onLogin(): void {
    if (this.isLoading) return;

    this.isLoading = true;

    this.userService.login({
email:this.email,
password: this.password,
    })
    .subscribe({
      next: (response) => {
this.messageService.add({
  severity: 'success',
  summary: 'Muvaffaqiyatli',
  detail: 'Tiz tizimga muvaffaqiyatli kirdingiz!',
  life: 3000,
});
      },
      error: (error) => {
this.messageService.add({
  severity: 'error',
  summary: 'Xatolik',
  detail: 'Tizimga kirishda xatolik yuz berdi!',
  life: 3000,
})
      },
    });
    // Implement login logic here
    console.log('Email:', this.email);
    console.log('Password', this.password);

    this.userService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // Handle successful login, e.g., redirect to dashboard
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Handle login error, e.g., show an error message
        },
      });
  }
}
