import { Component, OnInit } from '@angular/core';
import { UserBase } from '../../models/user-base';
import { Authority } from '../../models/authority';
import { ActivatedRoute, Router } from '@angular/router';
import { UserBaseService } from '../../services/user-base.service';

@Component({
  selector: 'app-user-base-detail',
  templateUrl: './user-base-detail.component.html',
  styleUrls: ['./user-base-detail.component.css']
})
export class UserBaseDetailComponent implements OnInit {

  userBase: UserBase = new UserBase();
  authorities = new Array<Authority>();
  userRoles = new Array<string>();
  id: number = -1;

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private userBaseService: UserBaseService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{

      this.id = params['id'];

      this.userBaseService.findUserBaseById(params['id']).subscribe(data =>{

        this.userBase = data;
        this.authorities = this.userBase.roles;

        this.authorities.forEach((a)=>{
          this.userRoles.push(a.authority);
        });
      });
    });
  }

  onNotify(changedUserRoles: []):void {
    // update current UserBase
    let updatedAuthorities: Array<Authority> = [];
    changedUserRoles.forEach((r)=>{
      updatedAuthorities.push(new Authority(r));
    });
    this.userBase.roles = updatedAuthorities;

    // put current userBase
    this.userBaseService.updateUserBase(this.userBase, this.id).subscribe(data =>{
      alert('Usuario actualizado correctamente');
    });
  }

  onCancel($event: any) {
    this.router.navigate(['/user-base']);
  }

}
