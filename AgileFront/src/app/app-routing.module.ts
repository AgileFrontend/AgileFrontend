import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create.post/create.post.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { authGuard } from './services/auth/auth.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // route to the login page
  { path: 'register', component: RegisterComponent }, // route to the register page
  {
    path: 'create.post',
    component: CreatePostComponent,
    canActivate: [authGuard],
  },
  { path: 'profile', component: ProfileComponent }, // route to the profile page
  { path: 'homepage', component: HomepageComponent }, // route to the home page
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
