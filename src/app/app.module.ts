import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SmartTooltipAngularModule } from 'smart-tooltip-angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import {ConnectionServiceModule} from 'ng-connection-service';

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
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { ContentsComponent } from './contents/contents.component';
import { HomeComponent } from './contents/home/home.component';
import { ProjectsComponent } from './contents/projects/projects.component';
import { WorkerComponent } from './contents/worker/worker.component';
import { WokerModalComponent } from './woker-modal/woker-modal.component';
import { SearchComponent } from './search/search.component';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { WorkboardComponent } from './contents/workboard/workboard.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditWorkerModalComponent } from './edit-worker-modal/edit-worker-modal.component';
import { ViewboardComponent } from './contents/viewboard/viewboard.component';
import { DeletemodalComponent } from './deletemodal/deletemodal.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { IsLoggedInPipe } from './is-logged-in.pipe';
import { CategoriesComponent } from './categories/categories.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PasswordComponent,
    HomepageComponent,
    DashboardComponent,
    MenuComponent,
    ContentsComponent,
    HomeComponent,
    ProjectsComponent,
    WorkerComponent,
    WokerModalComponent,
    SearchComponent,
    ProjectModalComponent,
    WorkboardComponent,
    ProfileComponent,
    EditWorkerModalComponent,
    ViewboardComponent,
    DeletemodalComponent,
    EditProjectComponent,
    LandingPageComponent,
    IsLoggedInPipe,
    CategoriesComponent,


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
    SmartTooltipAngularModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
    NgxPaginationModule,
    SimpleNotificationsModule.forRoot(),
    ConnectionServiceModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    LoaderService,

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
