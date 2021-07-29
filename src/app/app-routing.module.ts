import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContentsComponent } from './contents/contents.component';
import { HomeComponent } from './contents/home/home.component';
import { ProjectsComponent } from './contents/projects/projects.component';
import { WorkerComponent } from './contents/worker/worker.component';
import { WorkboardComponent } from './contents/workboard/workboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewboardComponent} from './contents/viewboard/viewboard.component'
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';

const routes: Routes = [

  {path: 'home-page', component: HomepageComponent},
  {path: 'worker/:id',component: ProfileComponent },
  {path: 'dashboard', component: DashboardComponent,children:[
    {path: 'content', component: ContentsComponent, children :[
      {path: 'home', component: HomeComponent},
      {path: 'projects', component: ProjectsComponent},
      {path: 'worker', component: WorkerComponent},
      {path: 'projectboard/:projectId', component:WorkboardComponent},
      {path: 'viewboard/:projectId/:userid', component: ViewboardComponent}
    ] }
  ]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'welcome', component:LandingPageComponent},
  {path: 'login', component: LoginSignupComponent},
  {path: 'sign-up', component: SignupComponent}
  // {path: 'login', component: LoginComponent},
  // {path: 'sign-up', component: SignupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
