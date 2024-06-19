import { Component } from '@angular/core'
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import socialIcons from './../../../assets/data/pages/social-items.json';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../service/auth.service';

@Component({
  templateUrl: './login-1.component.html'
})

export class Login1Component {
  loginForm: FormGroup;
  isLoading = false;
  error = false;
  socialMediaButtons = socialIcons.socialMediaButtons;

  validateForm!: UntypedFormGroup;

  constructor(private fb: FormBuilder, private router: Router, private location: Location, private authService: AuthService) { }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      this.authService.login(this.validateForm.value.userName, this.validateForm.value.password)
        .subscribe(user => {
          this.router.navigate(['/eventos/evento'])
        })

    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  passwordVisible = false;
  password?: string;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true],
    });
  }
}
