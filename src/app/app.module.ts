import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SmartTooltipAngularModule } from 'smart-tooltip-angular';


import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordComponent } from './password/password.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoaderService } from '../interceptors/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from 'src/interceptors/loading.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { MenuComponent } from './menu/menu.component';
import { ContentsComponent } from './contents/contents.component';
import { HomeComponent } from './contents/home/home.component';
import { ProjectsComponent } from './contents/projects/projects.component';
import { WorkerComponent } from './contents/worker/worker.component';
import { WokerModalComponent } from './woker-modal/woker-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PasswordComponent,
    HomepageComponent,
    NavbarComponent,
    DashboardComponent,
    TopmenuComponent,
    MenuComponent,
    ContentsComponent,
    HomeComponent,
    ProjectsComponent,
    WorkerComponent,
    WokerModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), //initialize firebase app
    AngularFirestoreModule, // for database features
    AngularFireAuthModule, // for auth features
    AngularFireStorageModule, //for storage
    ReactiveFormsModule,
    FormsModule,
    SmartTooltipAngularModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    LoaderService,

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
