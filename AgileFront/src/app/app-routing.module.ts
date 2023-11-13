import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CreatePostComponent } from './create.post/create.post.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MyProjectPageComponent } from './my-project-page/my-project-page.component';
import { authGuard } from './services/auth/auth.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [authGuard]}, // route to the login page
  { path: 'register', component: RegisterComponent },
  { path: 'homepage', component: HomepageComponent},
  { path: 'my-project-page', component: MyProjectPageComponent},
  {
    path: 'create.post',
    component: CreatePostComponent,
    canActivate: [authGuard],
  },
  { path: 'homepage', component: HomepageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), 
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
