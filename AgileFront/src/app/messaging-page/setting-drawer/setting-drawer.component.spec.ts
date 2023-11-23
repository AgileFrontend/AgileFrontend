import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDrawerComponent } from './setting-drawer.component';

describe('StettingDrawerComponent', () => {
  let component: SettingDrawerComponent;
  let fixture: ComponentFixture<SettingDrawerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingDrawerComponent],
    });
    fixture = TestBed.createComponent(SettingDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
