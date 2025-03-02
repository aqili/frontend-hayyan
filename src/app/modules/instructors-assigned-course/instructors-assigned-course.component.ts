import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '@base/base.component';

import { ResponseData } from '@proxy/domain/shared/common';
import { InstructorAssignedCoursesDto, InstructorAssignedCoursesList } from '@proxy/users';
import { CourseInstructorService } from '@proxy/courses';

@Component({
  selector: 'app-instructors-assigned-course',
  templateUrl: './instructors-assigned-course.component.html',
  styleUrls: ['./instructors-assigned-course.component.scss'],
})
export class InstructorAssignedCoursesComponent extends BaseComponent implements OnInit {
  get Service(): CourseInstructorService {
    return this.getByInjector(CourseInstructorService);
  }
  courses: InstructorAssignedCoursesDto[];
  ngOnInit() {
    super.ngOnInit();
    this.getInstructorAssignedCourses();
  }
  getInstructorAssignedCourses() {
    this.showIntervalLoader();
    this.Service.getInstructorAssignedCourses().subscribe(
      (arg: ResponseData<InstructorAssignedCoursesList>) => {
        this.hideIntervalLoader();
        if (arg.isValid) {
          this.courses = arg.data.instructorAssignedCourses;
        } else {
          this.ToasterService.error(arg.firstErrorMessage);
        }
      }
    );
  }
}
