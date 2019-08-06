import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandwichDetailComponent } from './sandwich-detail.component';

describe('SandwichDetailComponent', () => {
  let component: SandwichDetailComponent;
  let fixture: ComponentFixture<SandwichDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandwichDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandwichDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
