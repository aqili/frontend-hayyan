import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowExperimentComponent } from './show-experiment.component';

describe('ShowExperimentComponent', () => {
  let component: ShowExperimentComponent;
  let fixture: ComponentFixture<ShowExperimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowExperimentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowExperimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
