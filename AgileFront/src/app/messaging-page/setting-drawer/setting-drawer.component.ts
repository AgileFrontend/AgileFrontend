import { CommonModule, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InstantMessagingService } from 'src/app/services/instant-messaging/instant-messaging.service';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-setting-drawer',
  templateUrl: './setting-drawer.component.html',
  styleUrls: ['./setting-drawer.component.scss'],
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    NgIf,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterModule,
  ],
})
export class SettingDrawerComponent {
  settingState = 'menu';

  nameToSend: FormControl;
  nameForm: FormGroup;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<SettingDrawerComponent>,
    private messagingService: InstantMessagingService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: string,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.nameToSend = new FormControl('', [
      Validators.minLength(1),
      Validators.maxLength(50),
      Validators.required,
    ]);
    this.nameForm = new FormGroup({
      nameToSend: this.nameToSend,
    });
  }

  toggleChange(nextMenu: string) {
    this.settingState = nextMenu;
  }

  deleteConv() {
    this.messagingService.deleteConversationFromId(this.data);
    this._bottomSheetRef.dismiss({
      event: 'rename',
      data: this.nameToSend.value,
    });
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/messaging']);
    });
    this.snackBar.open('Your conversation was sucessfully removed', 'Ok');
  }

  addUser() {
    console.log('addUser');
  }

  removeUser() {
    console.log('removeUser');
  }

  updateName() {
    if (this.nameForm.valid) {
      this.messagingService.updateConversationFromID(this.data, {
        conversationName: this.nameToSend.value,
      });
      this._bottomSheetRef.dismiss({
        event: 'rename',
        data: this.nameToSend.value,
      });
      this.snackBar.open('Your conversation was sucessfully renamed', 'Ok');
    }
  }
}
