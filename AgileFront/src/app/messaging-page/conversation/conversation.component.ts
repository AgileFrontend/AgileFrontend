import { Component, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { InstantMessagingService } from 'src/app/services/instant-messaging/instant-messaging.service';
import { Message } from 'src/app/services/message';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent{

  @Input() conversationID!: string;
  messages$ : Observable<Message[]> = new Observable<Message[]>

  constructor(private messagingService : InstantMessagingService){
    console.log(this.conversationID)
    this.fetchAllMessage()
  }

  fetchAllMessage(){
    this.messages$ = this.messagingService.readAllMessagesFromConversationID(this.conversationID)
  }
}
