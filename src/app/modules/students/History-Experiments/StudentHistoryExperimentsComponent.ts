import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BaseModalComponent } from '@base/base-modal.component';
import { StudentHistoryExperimentsService } from '@proxy/application/services/student-history-experiments.service';
import { LookupDto } from '@proxy/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-Student-History-Experiments',
  templateUrl: './Student-History-Experiments.component.html',
  styleUrls: ['./Student-History-Experiments.component.scss']
})
export class StudentHistoryExperimentsComponent extends BaseModalComponent implements OnInit {
  courses : LookupDto[] ;
  experiments :  LookupDto[]; 
  groups :  LookupDto[];
  students :  LookupDto[];
  selectedCourse = null;
  selectedExperiment = null;
  selectedGroup = null;
  selectedStudent = null;


  showDetails = false; // Flag to control the display of the details component
  iframeUrl: SafeResourceUrl| null = null; // Use SafeResourceUrl
  private urlSubscription: Subscription | undefined;
  errorMessage: string | null = null;

  constructor(private router: Router ,  private sanitizer: DomSanitizer ) {

    super();
  }
  get Service(): StudentHistoryExperimentsService {
    return this.getByInjector(StudentHistoryExperimentsService);
  }
  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {

        this.Service.getCourses().subscribe((arg) => {

          if (arg) {
            this.courses = arg;
          } else {
            this.ToasterService.error('error fetch courses ');
          }
        });
  }

   loadExperiments( courseId  ) {
  
    this.Service.getExperimentsByCourseId(courseId).subscribe((arg) => {

        if (arg) {
          this.experiments = arg;
        } else {
          this.ToasterService.error('error fetch experiments ');
        }
      });
  }

   loadGroups(courseId) {
    this.Service.getGroupsByCourseId(courseId).subscribe((arg) => {

        if (arg) {
          this.groups = arg;
        } else {
          this.ToasterService.error('error fetch groups ');
        }
      });
  }

  onCourseChange(courseId) {
  
     this.loadExperiments(this.selectedCourse);
     this.loadGroups(this.selectedCourse);
  }


   onGroupChange(groupId) {
     this.loadStudents(this.selectedGroup );
  }

   loadStudents(groupId) {
    this.Service.getStudentsByGroupId(groupId).subscribe((arg) => {

        if (arg) {
          this.students = arg;
        } else {
          this.ToasterService.error('error fetch students ');
        }
      });
  }

  onSearch() {

    debugger
    if (this.selectedStudent && this.selectedExperiment) {
      this.showDetails = true; // Set the flag to true to display the details componen
      this.fetchIframeUrl();
    }
  }

  fetchIframeUrl(): void {
    this.urlSubscription = this.Service.getExperimentUrl(this.selectedStudent, this.selectedExperiment).subscribe({
      next: (url) => {
        debugger
        console.log(url);
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.errorMessage = null;
      },
      error: (error) => {
        console.error('Error fetching experiment URL:', error);
        this.errorMessage = "Failed to load experiment. Please check IDs and try again.";
      },
    });
  }
} 