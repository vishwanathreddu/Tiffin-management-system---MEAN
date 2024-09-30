import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../../../services/User-service/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: User[] = [];

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        // Assign serial numbers to users
        this.users = users.map((user, index) => ({
          ...user,
          slNo: index + 1
        }));
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
