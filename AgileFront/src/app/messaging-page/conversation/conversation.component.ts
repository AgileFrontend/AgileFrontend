import { Component, Input, OnChanges, Output} from '@angular/core';
import { Observable } from 'rxjs';
import { InstantMessagingService } from 'src/app/services/instant-messaging/instant-messaging.service';
import { Message } from 'src/app/services/message';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnChanges{

  @Input() conversationID!: string;
  @Input() @Output() currentUserID! : string
  @Output() messages$ : Observable<Message[]> = new Observable<Message[]>

  constructor(private messagingService : InstantMessagingService){
    }
  
  ngOnChanges(): void {
    this.messages$ = this.messagingService.readAllMessagesFromConversationID(this.conversationID)
  }    
}    
