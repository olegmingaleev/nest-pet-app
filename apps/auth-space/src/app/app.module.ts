import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileService } from './services/profile/profile.service';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AuthModule, DashboardModule],
  providers: [AsyncPipe, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule {}
