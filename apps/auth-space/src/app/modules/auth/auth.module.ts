import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { ProfileService } from '../../services/profile/profile.service';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AuthComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [AsyncPipe, ProfileService],
  exports: [AuthComponent]
})
export class AuthModule {}
