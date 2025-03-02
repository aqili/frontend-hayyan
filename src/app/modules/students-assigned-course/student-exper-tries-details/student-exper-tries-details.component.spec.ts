import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExperTriesDetailsComponent } from './student-exper-tries-details.component';

describe('StudentExperTriesDetailsComponent', () => {
  let component: StudentExperTriesDetailsComponent;
  let fixture: ComponentFixture<StudentExperTriesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentExperTriesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentExperTriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
