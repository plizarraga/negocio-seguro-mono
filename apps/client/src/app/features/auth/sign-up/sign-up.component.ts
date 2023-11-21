import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MatchingValidator } from 'src/app/shared/utils';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CheckboxModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [{ provide: MessageService, useClass: MessageService }],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  signUpForm: FormGroup;
  submitted = false;
  isSuccessful = false;
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
    this.signUpForm = this.initSignUpForm();
  }

  initSignUpForm() {
    return (this.signUpForm = this.formBuilder.group(
      {
        // email: ['test@test.com', [Validators.required, Validators.email]],
        // name: ['teeeeest', [Validators.required, Validators.minLength(3)]],
        // phone: ['6861234569', [Validators.required, Validators.minLength(10)]],
        // password: ['123123', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required, Validators.minLength(3)]],
        phone: ['', [Validators.required, Validators.minLength(10)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirmation: ['', Validators.required],
      },
      {
        validators: [
          MatchingValidator.match('password', 'passwordConfirmation'),
        ],
      } as AbstractControlOptions
    ));
  }

  get f() {
    return this.signUpForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.authService.signUp(this.signUpForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.isSuccessful = true;
      },
      error: (e: any) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${e.error.errors[0].title} ${e.error.errors[0].detail}`,
        });
      },
    });
  }
}
