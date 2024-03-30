import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserCacheService } from '../../services/user-cache.service';
import { log } from 'console';
import { UserInterface } from '../../interfaces/user.interface';
import { HeaderComponent } from '../../shared/header/header.component';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [HeaderComponent, LoaderComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  users: UserInterface[] = [];

  loading: boolean = false;

  filteredUsers: UserInterface[] = this.users;

  currentPage: number = 1;

  totalPages: number = 2;

  itemsPerPage!: 6;

  constructor(
    private userService: UserService,
    private userCacheService: UserCacheService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const cachedUsers = this.userCacheService.getUser(this.currentPage);
    if (cachedUsers) {
      this.filteredUsers = cachedUsers;
    } else {
      this.loading = true;
      this.userService
        .getUsers(this.currentPage)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: (response) => {
            this.users = response.data;
            this.filteredUsers = this.users;

            this.userCacheService.setUser(this.currentPage, this.users);
          },
          error: (err) => {
            alert('An error occurred');
          },
        });
    }
  }

  goToDetails(userId: number): void {
    if (userId) {
      this.router.navigate(['/user', userId]);
    }
  }

  filterUsers(userId: number) {
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (response) => {
          if (response.data) {
            this.filteredUsers = [response.data];
          } else {
            this.filteredUsers = this.users;
            alert('An error occurred');
          }
        },
        error: (err) => {
          alert('An error occurred');
        },
      });
    } else {
      this.loadUsers();
    }
    return;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }
}
