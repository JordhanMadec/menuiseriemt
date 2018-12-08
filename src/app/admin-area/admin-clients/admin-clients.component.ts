import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.scss']
})
export class AdminClientsComponent implements OnInit {

  public users: User[];

  constructor(private cd: ChangeDetectorRef, private authService: AuthService, private adminService: AdminService) {
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.adminService.getAllUsers().then(
      (users: User[]) => {
        this.users = users;
        this.cd.detectChanges();
      }
    );
  }
}
