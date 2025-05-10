import { AuthService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactFormData, ContactService, ContactUsDto } from '../shared/service/contact.service';
import { NotificationService } from '../shared/service/notification.service';
import { notifydataEnum } from '../shared/service/notify-types';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup;
  submitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';

  responsiveOptions: any[];

  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  images: { src: string; text: string }[] = [
    {
      src: './assets/wp-content/uploads/2home.png',
      text: '',
    },
    {
      src: './assets/wp-content/uploads/1home.png',
      text: '',
    },
    {
      src: './assets/wp-content/uploads/3home.png',
      text: '',
    },
  ];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private contactService: ContactService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    console.log('Contact Us initialized');
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      message: ['']
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    const formData: ContactFormData = {
      firstName: this.contactForm.value.firstName,
      lastName: this.contactForm.value.lastName,
      email: this.contactForm.value.email,
      phone: this.contactForm.value.phone || '',
      message: this.contactForm.value.message || ''
    };

    this.contactService.submitContactForm(formData)
      .pipe(
        finalize(() => {
          this.submitting = false;
        })
      )
      .subscribe(
        (response: ContactUsDto) => {
          console.log('Contact form submitted successfully', response);
          this.submitSuccess = true;
          this.contactForm.reset();
          this.notificationService.sendEvent(notifydataEnum.success, 'تم إرسال رسالتك بنجاح!');
        },
        error => {
          console.error('Error submitting contact form', error);
          this.submitError = true;
          console.log(error.message );
          this.errorMessage =  'حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.';
          this.notificationService.sendEvent(notifydataEnum.error, this.errorMessage);
        }
      );
  }

  // Helper methods for form validation
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  resetForm(): void {
    this.contactForm.reset();
    this.submitSuccess = false;
    this.submitError = false;
  }
}
