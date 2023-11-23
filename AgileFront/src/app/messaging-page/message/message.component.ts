import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DisplayProfileService } from 'src/app/services/display-profile/display-profile.service';
import { Message } from 'src/app/services/message';
import { User } from 'src/app/services/user';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnChanges {
  @Input() message!: Message;
  @Input() currentUserID!: string;

  senderUser : User = {
    name: '',
    surname: '',
    occupation: '',
    phoneNumber: '',
    email: '',
    bio: '',
    photoURL: '',
    address: '',
    town: '',
    postalCode: '',
  };

  constructor(private displayProfileService : DisplayProfileService){
    
  }

  ngOnChanges(): void {
    this.displayProfileService.getUserWithUID(this.message.senderID).then(
      (snapshot) =>{
        this.senderUser = snapshot.data() as User
      }
    )
    
  }

}
