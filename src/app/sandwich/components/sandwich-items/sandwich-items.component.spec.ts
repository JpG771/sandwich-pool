import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandwichItemsComponent } from './sandwich-items.component';

describe('SandwichItemsComponent', () => {
  let component: SandwichItemsComponent;
  let fixture: ComponentFixture<SandwichItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandwichItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandwichItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
