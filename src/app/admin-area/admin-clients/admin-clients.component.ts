import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { User } from '../../models/user';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.scss']
})
export class AdminClientsComponent implements OnInit {

  public users: User[];
  public usersFiltered: User[];
  public filterValue = '';

  constructor(private cd: ChangeDetectorRef, private adminService: AdminService) {
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.adminService.getAllUsers().then(
      (users: User[]) => {
        this.users = users;
        this.usersFiltered = users;
        this.cd.detectChanges();
      }
    );
  }

  onSearch() {
    this.usersFiltered = _.filter(this.users, (user: User) => {
      return user.firstName.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        user.email.toLowerCase().includes(this.filterValue.toLowerCase());
    });
    this.cd.detectChanges();
  }
}
