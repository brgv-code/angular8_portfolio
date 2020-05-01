import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ParticlesModule } from 'angular-particle';

import { AppComponent } from './app.component';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ProfileModule } from './profile/profile.module';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }

];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, config),
    ProfileModule,
    HttpClientModule,
    ParticlesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
