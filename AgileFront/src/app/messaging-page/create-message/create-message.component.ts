import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Conversation } from 'src/app/services/conversation';
import { InstantMessagingService } from 'src/app/services/instant-messaging/instant-messaging.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss'],
})
export class CreateMessageComponent {
  messageToSend: FormControl;
  messageForm: FormGroup;

  @Input() conversationID!: string;
  @Input() conversationData!: Conversation;

  constructor(private messagingService: InstantMessagingService) {
    this.messageToSend = new FormControl('', [
      Validators.minLength(1),
      Validators.maxLength(200),
      Validators.required,
    ]);
    this.messageForm = new FormGroup({
      messageToSend: this.messageToSend,
    });
  }

  onSubmit() {
    if (this.messageForm.valid) {
      this.messagingService.AddMessageToConv(
        this.messageForm.value,
        this.conversationID,
        this.conversationData,
      );
      this.messageForm.setValue({ messageToSend: '' });
    }
  }
}
