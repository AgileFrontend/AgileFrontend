import { Component, Input } from '@angular/core';
import { Conversation } from 'src/app/services/conversation';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent {

  @Input() conversation!: Conversation;

}
