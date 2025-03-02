import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeModalComponent } from './deposite-modal.component';

describe('DepositeModalComponent', () => {
  let component: DepositeModalComponent;
  let fixture: ComponentFixture<DepositeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
