import { ConfigStateService } from '@abp/ng.core';

import { Injectable, OnInit } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService implements OnInit {
  private currentUser: any;

  constructor(private config: ConfigStateService) {
    this.config.getOne$('currentUser').subscribe(currentUser => {
      console.log("abdo",currentUser)
      this.currentUser = currentUser;
    });
  }
  ngOnInit(): void {}
  public getCurrentUser() {
    return this.currentUser;
  }
  public getCurrentUserRoles():string[] {
    return this.currentUser.roles;
  }
  checkCurrentUserInRoles(roles:any[]){
    return this.getCurrentUserRoles().some(c=>roles.includes(c));
  }
  checkCurrentUserInRole(role){
    return this.getCurrentUserRoles().includes(role);

}
}
