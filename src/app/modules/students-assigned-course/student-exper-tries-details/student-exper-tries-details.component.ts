import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@base/base.component';
import { StudentHistoryExperimentsService } from '@proxy/application/services/student-history-experiments.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-exper-tries-details',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './student-exper-tries-details.component.html',
})
export class StudentExperTriesDetailsComponent extends BaseComponent implements OnInit {

  studentid: string | null = null;
  experimentid: string | null = null;
  //iframeUrl: any; // Use `any` or create a SafeResourceUrl type if needed.
  private queryParamsSubscription: Subscription | undefined;
  private urlSubscription: Subscription | undefined;
  errorMessage: string | null = null;
  
  iframeUrl: SafeResourceUrl | null = null; // Use SafeResourceUrl


  get Service(): StudentHistoryExperimentsService {
    return this.getByInjector(StudentHistoryExperimentsService);
  }
  
  constructor(private route: ActivatedRoute ,    private sanitizer: DomSanitizer ) {
  super();

  }

  ngOnInit(): void {
    debugger
    this.queryParamsSubscription = this.route.queryParams.subscribe((params) => {
      this.studentid = params['studentid'];
      this.experimentid = params['experimentid'];

      if (this.studentid && this.experimentid) {
        this.fetchIframeUrl(this.studentid, this.experimentid);
      } else {
        this.errorMessage = "Student ID and Experiment ID are required.";
      }
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
    if(this.urlSubscription){
      this.urlSubscription.unsubscribe();
    }
  }
  fetchIframeUrl(studentid: string, experimentid: string): void {
    this.urlSubscription = this.Service.getExperimentUrl(studentid, experimentid).subscribe({
      next: (url) => {
        console.log(url);
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url); // Sanitize the URL; // Consider using DomSanitizer if needed
        this.errorMessage = null;
      },
      error: (error) => {
        console.error('Error fetching experiment URL:', error);
        this.errorMessage = "Failed to load experiment. Please check IDs and try again.";
      },
    });
  }
}
