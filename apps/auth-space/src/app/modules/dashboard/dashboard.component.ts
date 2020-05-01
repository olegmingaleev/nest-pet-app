import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'nx-auth-space-dashboard',
  template: `
    <div *ngIf="profileService.state$.value as profile" class="wrapper">
      <h1>Hello, {{ profile.email }}</h1>
      <button type="button" (click)="signout()">SIGN OUT</button>
    </div>
  `
})
export class DashboardComponent {
  constructor(
    private http: HttpClient,
    public profileService: ProfileService
  ) {}

  signout() {
    this.http.get('/api/auth/signout').subscribe(() => {
      this.profileService.validate();
    });
  }
}
