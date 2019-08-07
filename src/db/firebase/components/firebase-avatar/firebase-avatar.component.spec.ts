import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseAvatarComponent } from './firebase-avatar.component';

describe('FirebaseAvatarComponent', () => {
  let component: FirebaseAvatarComponent;
  let fixture: ComponentFixture<FirebaseAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirebaseAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
