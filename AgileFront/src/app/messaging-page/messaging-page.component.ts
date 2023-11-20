import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversation } from '../services/conversation';
import { InstantMessagingService } from '../services/instant-messaging/instant-messaging.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-messaging-page',
  templateUrl: './messaging-page.component.html',
  styleUrls: ['./messaging-page.component.scss']
})
export class MessagingPageComponent {

  conversations$: Observable<Conversation[]> = new Observable<Conversation[]>

  constructor(private messagingService : InstantMessagingService,private authService: AuthService){
    this.fetchUserConv()
  }

  async fetchUserConv(){
    const currentUser = await this.authService.getCurrentUser()
    if(currentUser != null){
      this.conversations$ = this.messagingService.readAllCurrentUserConversation(currentUser.uid)
    }
  }
}
