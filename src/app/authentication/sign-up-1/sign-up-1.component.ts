import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import socialIcons from './../../../assets/data/pages/social-items.json';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
    templateUrl: './sign-up-1.component.html'
})

export class SignUp1Component {
    socialMediaButtons = socialIcons.socialMediaButtons;
    signUpForm: FormGroup;
    isLoading = false;
    error = false;
    constructor(private fb: FormBuilder, private authService: AuthService,
        private router: Router
    ) {
    }

    submitForm(): void {

        for (const i in this.signUpForm.controls) {
            this.signUpForm.controls[i].markAsDirty();
            this.signUpForm.controls[i].updateValueAndValidity();
        }

        this.authService.singUp(this.formatDataFormToInterfaceUser(this.signUpForm.value))
            .subscribe(user => {
                console.log(user);

                this.router.navigate(['/authentication/login-1'])
            })
    }

    private formatDataFormToInterfaceUser(formValue: any): User {

        // Crear el objeto usuario
        const usuarioSignedUp: User = {
            email: formValue.email,
            password: formValue.password,
            persona: {
                nombre: formValue.nombre,
                apellido: formValue.apellido,
                fechaNacimiento: formValue.fechaNacimiento
            }
        };

        return usuarioSignedUp;
    }

    updateConfirmValidator(): void {
        Promise.resolve().then(() => this.signUpForm.controls.checkPassword.updateValueAndValidity());
    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.signUpForm.controls.password.value) {
            return { confirm: true, error: true };
        }
    }


    passwordVisible = false;
    password?: string;
    ngOnInit(): void {
        this.signUpForm = this.fb.group({
            email: [null, [Validators.required]],
            password: [null, [Validators.required]],
            nombre: [null, [Validators.required]],
            apellido: [null, [Validators.required]],
            fechaNacimiento: [null, [Validators.required, this.confirmationValidator]],
        });
    }
}
