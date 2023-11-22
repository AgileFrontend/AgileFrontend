import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatePostComponent } from './create.post/create.post.component';
import { LoginComponent } from './login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { MyProjectPageComponent } from './my-project-page/my-project-page.component';
import { ProjectComponent } from './project/project.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { MatListModule } from '@angular/material/list';
import { ToastrModule } from 'ngx-toastr';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DisplayProfileComponent } from './display-profile/display-profile.component';
import { MessageComponent } from './messaging-page/message/message.component';
import { MessagingPageComponent } from './messaging-page/messaging-page.component';
import { ConversationComponent } from './messaging-page/conversation/conversation.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CreateMessageComponent } from './messaging-page/create-message/create-message.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { CommentsComponent } from './project/comments/comments.component';
import { CommentComponent } from './project/comments/comment/comment.component';
import { CreateCommentComponent } from './project/comments/create-comment/create-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    LoginComponent,
    HomepageComponent,
    RegisterComponent,
    MyProjectPageComponent,
    NavbarComponent,
    ProjectComponent,
    EditProfileComponent,
    FileUploadComponent,
    DisplayProfileComponent,
    MessageComponent,
    MessagingPageComponent,
    ConversationComponent,
    CreateMessageComponent,
    CommentsComponent,
    CommentComponent,
    CreateCommentComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'agilebackend-9e4d6',
        appId: '1:592568335590:web:b4712eaa69ff0502cccf27',
        storageBucket: 'agilebackend-9e4d6.appspot.com',
        apiKey: 'AIzaSyCEoR-Q079wqtiXOaMG9jXUdxtclKHGqmQ',
        authDomain: 'agilebackend-9e4d6.firebaseapp.com',
        messagingSenderId: '592568335590',
        measurementId: 'G-5T240TZMVG',
      }),
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    ToastrModule,
    MatGridListModule,
    MatTabsModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
