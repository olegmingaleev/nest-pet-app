import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { AsyncPipe } from '@angular/common';
import { ProfileService } from '../../services/profile/profile.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DashboardComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [AsyncPipe, ProfileService],
  exports: [DashboardComponent]
})
export class DashboardModule {}
