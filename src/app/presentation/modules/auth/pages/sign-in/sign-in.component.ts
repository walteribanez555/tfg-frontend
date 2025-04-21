import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AuthService } from 'src/app/server/services/auth/auth.service';
import { LoginRequestDto } from 'src/app/server/services/auth/models/login-request.dto';
import { SpinnerComponent } from "../../../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgIf, ButtonComponent, NgClass, SpinnerComponent],
})
export class SignInComponent implements OnInit {
  #authService = inject(AuthService);

  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;

  protected isLoading = signal(false);

  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router) {}

  onClick() {
    console.log('Button clicked');
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    const { email, password } = this.form.value;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.isLoading.set(true);

    const loginRequestDto : LoginRequestDto= {
      email : email,
      password : password
    }

    console.log("Por aqui");

    this.#authService.login(loginRequestDto).subscribe({
      next: (res) => {
        console.log(res);
        this._router.navigate(['/dashboard/schedule']);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    })


  }
}
