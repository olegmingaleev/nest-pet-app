import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'nx-auth-space-auth',
  template: `
    <form
      *ngIf="!profile.state$.value"
      (submit)="onSubmit($event, email.value, password.value)"
    >
      <p>
        <label class="ui-field">
          <span class="ui-field__label">Email</span>
          <input #email class="ui-field__native" type="email" />
        </label>
      </p>
      <p>
        <label class="ui-field">
          <span class="ui-field__label">Password</span>
          <input #password class="ui-field__native" type="password" />
        </label>
      </p>
      <p>
        <button class="ui-button">Send</button>
      </p>
    </form>
  `,
  styleUrls: ['./auth.component.styl']
})
export class AuthComponent {
  constructor(private http: HttpClient, public profile: ProfileService) {}

  onSubmit(event, email, password) {
    event.preventDefault();

    if (email && password) {
      this.http
        .post('/api/auth/signin', {
          email,
          password
        })
        .subscribe(() => {
          this.profile.validate();
        });
    }
  }
}
