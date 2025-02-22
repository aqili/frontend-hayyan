import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '@base/base.component';

import { ResponseData } from '@proxy/domain/shared/common';
import {
  CourseService,
  StudentAssignedCoursesDto,
  StudentAssignedCoursesList,
} from '@proxy/courses';

@Component({
  selector: 'app-students-assigned-course',
  templateUrl: './students-assigned-course.component.html',
  styleUrls: ['./students-assigned-course.component.scss'],
})
export class StudentAssignedCoursesComponent extends BaseComponent implements OnInit {
  get Service(): CourseService {
    return this.getByInjector(CourseService);
  }
  courses: StudentAssignedCoursesDto[];
  ngOnInit() {
    super.ngOnInit();
    this.getStudentAssignedCourses();
  }
  getStudentAssignedCourses() {
    this.showIntervalLoader();
    this.Service.getStudentCourses().subscribe((arg: ResponseData<StudentAssignedCoursesList>) => {
      this.hideIntervalLoader();
      if (arg.isValid) {
        this.courses = arg.data.studentAssignedCourses;
      } else {
        this.ToasterService.error(arg.firstErrorMessage);
      }
    });
  }

  openCourseDetails(item: StudentAssignedCoursesDto) {
    this.navigateToRouteByEncrypted('students/experiment', {
      courseId: item.courseId,
      groupId: item.groupId,
    });
  }
}
