import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandwichFilteringComponent } from './sandwich-filtering.component';

describe('SandwichFilteringComponent', () => {
  let component: SandwichFilteringComponent;
  let fixture: ComponentFixture<SandwichFilteringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandwichFilteringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandwichFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
