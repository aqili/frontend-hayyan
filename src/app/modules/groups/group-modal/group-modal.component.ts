import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseModalComponent } from '@base/base-modal.component';

import { ResponseData } from '@proxy/domain/shared/common';
import { GroupDto, GroupService } from '@proxy/groups';
import { StudntDto } from '@proxy/users';

import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
})
export class GroupModalComponent extends BaseModalComponent implements OnInit {
  get Service(): GroupService {
    return this.getByInjector(GroupService);
  }
  groupId = null;
  students: StudntDto[] = [];
  selectedGroup = {} as GroupDto; // reset the selected group
  isEdit = false;
  ngOnInit(): void {
    super.ngOnInit();
    if (this.groupId) this.getByParams(this.groupId);
  }
  protected buildForm(): void {
    this.form = this.FormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
      description: [null, Validators.maxLength(500)],
      studentIds: [],
    });
  }
  protected save(): Promise<ResponseData<GroupDto>> {
    if (this.isEdit) {
      return this.Service.update(this.selectedGroup.id, this.form.getRawValue()).toPromise();
    }
    return this.Service.create(this.form.getRawValue()).toPromise();
  }
  protected getByParamsPromise(item: any): Promise<ResponseData<any>> {
    return firstValueFrom(this.Service.get(item));
  }
  protected fillFormData(data: GroupDto): void {
    super.fillFormData(data);
    this.f.studentIds.setValue(data.students.map(s => s.id));
  }
}
