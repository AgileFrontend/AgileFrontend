import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create.post/create.post.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './services/auth/auth.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // route to the login page
  { path: 'register', component: RegisterComponent },
  { path: 'create.post', component: CreatePostComponent, canActivate: [authGuard] }
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
