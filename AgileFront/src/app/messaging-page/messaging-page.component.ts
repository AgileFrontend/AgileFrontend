import { Component, Output } from '@angular/core';
import { Conversation } from '../services/conversation';
import { InstantMessagingService } from '../services/instant-messaging/instant-messaging.service';
import { AuthService } from '../services/auth/auth.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {SettingDrawerComponent} from './setting-drawer/setting-drawer.component'
@Component({
  selector: 'app-messaging-page',
  templateUrl: './messaging-page.component.html',
  styleUrls: ['./messaging-page.component.scss'],
})
export class MessagingPageComponent {
  conversationDictionary: Record<string, Conversation> = {};
  @Output() chosenConversation!: string;
  @Output() currentUserID!: string;
  constructor(
    private messagingService: InstantMessagingService,
    private authService: AuthService,
    private _bottomSheet: MatBottomSheet

  ) {
    this.fetchUserConv();
  }

  async fetchUserConv() {
    const currentUser = await this.authService.getCurrentUser();
    if (currentUser) {
      this.currentUserID = currentUser.uid;
      this.messagingService
        .readAllUserConversation(currentUser.uid)
        .then((querySnap) => {
          querySnap.forEach((doc) => {
            this.conversationDictionary[doc.id] = doc.data() as Conversation;
          });
        });
    }
  }

  onClickConversation(conversationKey: string) {
    this.chosenConversation = conversationKey;
  }

  displayConvSetting(convKey : string){
    this._bottomSheet.open(SettingDrawerComponent)
  }
}
