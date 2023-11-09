import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [AppComponent, HomepageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
