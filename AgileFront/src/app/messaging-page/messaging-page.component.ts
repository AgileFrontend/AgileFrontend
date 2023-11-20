import { Component, Output } from '@angular/core';
import { Conversation } from '../services/conversation';
import { InstantMessagingService } from '../services/instant-messaging/instant-messaging.service';
import { AuthService } from '../services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-messaging-page',
  templateUrl: './messaging-page.component.html',
  styleUrls: ['./messaging-page.component.scss']
})
    
export class MessagingPageComponent {
  messageToSend = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(200),
  ]);

  messageForm = new FormGroup({
    messageToSend: this.messageToSend
  })

  conversationDictionary: Record<string,Conversation> = {};
  @Output() chosenConversation! : string
  @Output() currentUserID! : string
  constructor(private messagingService : InstantMessagingService,private authService: AuthService){ 
    this.fetchUserConv()
  }

  async fetchUserConv(){
    const currentUser = await this.authService.getCurrentUser()
    if(currentUser){
      this.currentUserID = currentUser.uid
      this.messagingService.readAllUserConversation(currentUser.uid).then((querySnap) =>{
        querySnap.forEach((doc)=> {
          this.conversationDictionary[doc.id] = doc.data() as Conversation;
        })
      })
    }
  }

  onClickConversation(conversationKey : string){
    this.chosenConversation = conversationKey
  }
}