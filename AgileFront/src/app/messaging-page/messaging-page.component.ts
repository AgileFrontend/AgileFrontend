import { Component, OnChanges, Output } from '@angular/core';
import { Conversation } from '../services/conversation';
import { InstantMessagingService } from '../services/instant-messaging/instant-messaging.service';
import { AuthService } from '../services/auth/auth.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SettingDrawerComponent } from './setting-drawer/setting-drawer.component';
@Component({
  selector: 'app-messaging-page',
  templateUrl: './messaging-page.component.html',
  styleUrls: ['./messaging-page.component.scss'],
})
export class MessagingPageComponent implements OnChanges {
  conversationDictionary: Record<string, Conversation> = {};
  @Output() chosenConversation!: string;
  @Output() currentUserID!: string;
  constructor(
    private messagingService: InstantMessagingService,
    private authService: AuthService,
    private _bottomSheet: MatBottomSheet,
  ) {
    this.fetchUserConv();
  }

  ngOnChanges(): void {
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

  displayConvSetting() {
    const bottomSheetRef = this._bottomSheet.open(SettingDrawerComponent, {
      data: this.chosenConversation,
    });
    bottomSheetRef.afterDismissed().subscribe((data) => {
      switch (data.event) {
        case 'rename':
          this.conversationDictionary[
            this.chosenConversation
          ].conversationName = data.data;
          break;
        case 'remove':
          console.log('conv removed');
      }
    });
  }
}
