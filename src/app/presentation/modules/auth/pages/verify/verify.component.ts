import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//Generate the template for verify with a message as verified email
@Component({
  selector: 'app-verify',
  imports: [],
  template : `
    <div class="flex flex-col items-center justify-center h-full">
      <h1 class="text-2xl text-foreground font-bold">Email Verified</h1>
      <p class="mt-4 text-lg text-foreground">Your email has been successfully verified.</p>
      <p class="mt-2 text-lg text-foreground">You can now log in to your account.</p>
    </div>
    `
})
export class VerifyComponent implements OnInit {
  ngOnInit(): void {
    const { email } = this.routeParams.snapshot.queryParams;
    this.verifyEmail(email);
  }

  routeParams=  inject(ActivatedRoute);
  #http = inject(HttpClient);

  verifyEmail(email: string) {
    this.#http.get(`https://8p5ylt31ih.execute-api.us-east-1.amazonaws.com/api/client/verify?email=${email}`).subscribe({
      next: (response) => {
        console.log('Email verified successfully', response);
      },
      error: (error) => {
        console.error('Error verifying email', error);
      },
    });
  }
 }
