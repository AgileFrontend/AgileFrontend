import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent {
  messageToSend = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(200),
  ]);

  messageForm = new FormGroup({
    messageToSend: this.messageToSend
  })
  
}
