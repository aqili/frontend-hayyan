import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@base/base.component';
import { ResponseData } from '@proxy/domain/shared/common';
import { ResponseValidatePasswordDTO, ValidatePasswordTokenInput } from '@proxy/users';
import { MustMatch } from '@shared/models/must-match.validator';
import { CustomValidationService } from '@shared/service/custom-validation.service';
import { InstractorService } from '../../../../proxy/services/instractor.service';

@Component({
  selector: 'app-active-accout',
  templateUrl: './active-accout.component.html',
  styleUrls: ['./active-accout.component.scss'],
})
export class ActiveAccoutComponent extends BaseComponent  implements OnInit {
  form: FormGroup;
  passwordDto: ValidatePasswordTokenInput = {} as ValidatePasswordTokenInput;

  validPage = false;
  success = false;
  constructor(
    private customValidationService: CustomValidationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service:InstractorService,
  ) {
    super()
  }

  ngOnInit(): void {
    let currentQueryString = window.location.search;
    if (currentQueryString) {
      this.route.queryParams.subscribe(params => {
        if (params.id && params.token) {
          this.passwordDto.id = params.id;
          this.passwordDto.token = encodeURIComponent(params.token);
          this.validPage = true;
        }
      });
    } else {
      // TODO document why this block is empty
    
    }
    this.buildForm();
  }
  buildForm() {
    this.form = this.fb.group(
      {
        password: new FormControl(null, [
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            this.customValidationService.patternValidator(/\d/, {
              hasNumber: true,
            }),
            // check whether the entered password has upper case letter
            CustomValidationService.hasCapitalCase(),
            // check whether the entered password has a lower case letter
            CustomValidationService.hasSmallCase(),
            // check whether the entered password has a special character
            this.customValidationService.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true,
              }
            ),
            CustomValidationService.englishOnly,
            Validators.minLength(8),
            Validators.maxLength(25),
          ]),
        ]),
        confirmpassword: new FormControl(null, [Validators.required]),
      },
      {
        validator: MustMatch('password', 'confirmpassword'),
      }
    );
  }
  onSubmit() {
    if (this.form.invalid) {
      this.ToasterService.warn(this.LocalizationService.instant('Requests::msg_must_fill_all'));
      return;
    }
    if (!this.validPage) {
      this.ToasterService.warn(this.LocalizationService.instant('Requests::msg_must_fill_all'));
      return;
    }
    this.passwordDto = Object.assign(this.passwordDto, this.form.value);
    this.activate();
  }
  activate() {
    this.showIntervalLoader();
    this.service
      .validatePasswordTokenByInput(this.passwordDto)
      .subscribe((data: ResponseData<ResponseValidatePasswordDTO>) => {
        if (data.isValid) {
          this.success = true;
          // Business
        } else {
          this.ToasterService.error(data.firstErrorMessage, '', { closable: false, life: 7000 });
        }
        this.hideIntervalLoader();
      });
  }
}
