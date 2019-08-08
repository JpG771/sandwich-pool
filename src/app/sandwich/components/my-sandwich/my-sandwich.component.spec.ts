import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySandwichComponent } from './my-sandwich.component';

describe('MySandwichComponent', () => {
  let component: MySandwichComponent;
  let fixture: ComponentFixture<MySandwichComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySandwichComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySandwichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
