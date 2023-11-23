import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-setting-drawer',
  templateUrl: './setting-drawer.component.html',
  styleUrls: ['./setting-drawer.component.scss'],
  standalone: true,
  imports: [MatListModule],
})


export class SettingDrawerComponent {

  constructor(private _bottomSheetRef: MatBottomSheetRef<SettingDrawerComponent>){}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
