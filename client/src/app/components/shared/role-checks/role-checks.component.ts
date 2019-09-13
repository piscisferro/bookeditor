import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Roles } from '../../../models/roles';

@Component({
  selector: 'app-role-checks',
  templateUrl: './role-checks.component.html',
  styleUrls: ['./role-checks.component.css']
})
export class RoleChecksComponent implements OnInit {

  roles = Object.keys(Roles).filter(k => typeof Roles[k as any] === "number");
  @Input() userRoles = new Array<string>();
  @Output() notify: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onChangeCheckBoxvalue(role: string) {
      this.userRoles.indexOf(role) > -1 ? this.userRoles = this.userRoles.filter(e => e !== role) : this.userRoles.push(role);
  }

  onSaveChanges() {
    this.notify.emit(this.userRoles);
  }

  onCancel() {
    this.cancel.emit();
  }

}
