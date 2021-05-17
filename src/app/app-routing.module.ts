import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContentsComponent } from './contents/contents.component';
import { HomeComponent } from './contents/home/home.component';
import { ProjectsComponent } from './contents/projects/projects.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'home-page', component: HomepageComponent},
  {path: 'dashboard', component: DashboardComponent,children:[
    {path: 'content', component: ContentsComponent, children :[
      {path: 'home', component: HomeComponent},
      {path: 'projects', component: ProjectsComponent}
    ] }
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
