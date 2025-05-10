import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactUsDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  isResolved: boolean;
  creationTime: string;
  creatorId?: string;
  lastModificationTime?: string;
  lastModifierId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apis.default.url}/api/app/contact-us`;

  constructor(private http: HttpClient) { }

  /**
   * Send contact form data to the API
   * @param formData The contact form data
   * @returns Observable of the API response
   */
  submitContactForm(formData: ContactFormData): Observable<ContactUsDto> {
    return this.http.post<ContactUsDto>(`${this.apiUrl}/submit-contact-form`, formData);
  }
} 