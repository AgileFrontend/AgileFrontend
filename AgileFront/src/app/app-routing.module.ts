import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create.post/create.post.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MyProjectPageComponent } from './my-project-page/my-project-page.component';
import { authGuard } from './services/auth/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { ProjectComponent } from './project/project.component';
import { DisplayProfileComponent } from './display-profile/display-profile.component';
import { MessagingPageComponent } from './messaging-page/messaging-page.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'homepage', component: HomepageComponent },
  {
    path: 'my-project-page',
    component: MyProjectPageComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent }, // route to the login page
  {
    path: 'create.post',
    component: CreatePostComponent,
    canActivate: [authGuard],
  },
  {
    path: 'post',
    component: ProjectComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile/edit',
    component: EditProfileComponent,
    canActivate: [authGuard],
  }, // route to the profile page,
  { path: 'profile/:id', component: DisplayProfileComponent },
  {
    path: 'messaging',
    component: MessagingPageComponent,
    canActivate: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ToastrModule.forRoot()],
  exports: [RouterModule],
})
export class AppRoutingModule {}
