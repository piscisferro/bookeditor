import { Component, OnInit } from '@angular/core';
import { UserBase } from '../../models/user-base';
import { Authority } from '../../models/authority';

import { UserBaseService } from '../../services/user-base.service';

@Component({
  selector: 'app-user-base',
  templateUrl: './user-base.component.html',
  styleUrls: ['./user-base.component.css']
})
export class UserBaseComponent implements OnInit {

  userBases = new Array<UserBase>();
  userRoles = new Array<string>();

  username: string;
  showEdition:boolean = false;

  constructor(private userBaseService: UserBaseService) { }

  ngOnInit() {
    this.userBaseService.findAllUserBases().subscribe(data =>{
      this.userBases = data;
    });;
  }

  newUser() {
    this.showEdition = !this.showEdition;

    this.username = undefined;
    this.userRoles = [];
  }

  onNotify(changedUserRoles: []):void {
    if (typeof this.username === 'undefined') {
      alert('Debe introducir un nombre de usuario');
    } else {

      this.showEdition = false;

      // create a new UserBase
      let userBase: UserBase = new UserBase();

      userBase.username = this.username;

      let updatedAuthorities: Array<Authority> = [];
      changedUserRoles.forEach((r)=>{
        updatedAuthorities.push(new Authority(r));
      });

      userBase.roles = updatedAuthorities;

      /* ---- */
      userBase.name = 'name';
      userBase.surname = 'surname';
      userBase.password = 'password';
      userBase.enabled = true;
      userBase.accountExpired = false;
      userBase.accountLocked = false;
      userBase.passwordExpired = false;
      /* ---- */

      this.userBaseService.createUserBase(userBase).subscribe(data =>{
        if(data) {
          this.userBases = this.userBaseService.findAllUserBases().subscribe(data =>{
            alert('Usuario creado correctamente');
          });;
        }
      });;
    }
  }

  onCancel($event: any) {
    this.showEdition = false;
  }

}
