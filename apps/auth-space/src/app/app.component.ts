import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ProfileService } from './services/profile/profile.service';

@Component({
  selector: 'nx-auth-space-root',
  template: `
    <div class="container">
      <h1 class="ui-form">Sign in to App</h1>
      <nx-auth-space-auth></nx-auth-space-auth>
    </div>
    <nx-auth-space-dashboard></nx-auth-space-dashboard>
  `,
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements AfterViewInit {
  constructor(public profile: ProfileService) {}

  ngAfterViewInit() {
    this.profile.validate();
  }
}
