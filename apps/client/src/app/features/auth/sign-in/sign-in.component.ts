import { Component, inject } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [{ provide: MessageService, useClass: MessageService }],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  signInForm: FormGroup;
  submitted = false;
  isLoading = false;

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  constructor() {
    // redirect to home if already logged in
    // if (this.authService.userValue) {
    //   this.router.navigate(['/']);
    // }
    this.signInForm = this.initSignInForm();
  }

  initSignInForm() {
    return (this.signInForm = this.formBuilder.group({
      email: ['barry.allen@example.com', Validators.required],
      password: ['123123', Validators.required],
    }));
  }

  get f() {
    return this.signInForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.authService.signIn(this.signInForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/');
      },
      error: (e) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${e.message}`,
        });
      },
    });
  }
}
