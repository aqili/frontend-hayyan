import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAccoutComponent } from './active-accout.component';

describe('ActiveAccoutComponent', () => {
  let component: ActiveAccoutComponent;
  let fixture: ComponentFixture<ActiveAccoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveAccoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveAccoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
