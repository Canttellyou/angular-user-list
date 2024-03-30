import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { finalize } from 'rxjs';
import { UserInterface } from '../../interfaces/user.interface';
import { Location } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  /**
   * The user interface object representing the details of the selected user.
   */
  user!: UserInterface;

  /**
   * A boolean flag indicating whether the component is currently loading user data.
   */
  loading: boolean = false;

  /**
   * Constructor for UserDetailComponent.
   * It injects the ActivatedRoute, UserService, and Location services.
   * @param route The ActivatedRoute service providing access to route parameters.
   * @param userService The UserService service for fetching user data.
   * @param location The Location service for navigating back to the user list page.
   */
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  /**
   * The lifecycle hook that initializes the component.
   * It fetches the user data based on the route parameter and updates the user property.
   * If an error occurs during the fetch, it alerts the user with the error message.
   * @returns A Subscription object that can be used to unsubscribe from the observable.
   */
  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.getUserDetails(userId);
    }
  }

  getUserDetails(userId: string) {
    this.loading = true;
    this.userService
      .getUserById(userId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          if (response.data) {
            this.user = response.data;
          }
        },
        error: (error) => {
          console.log('error');
        },
      });
  }

  /**
   * A method to navigate back to the user list page.
   */
  goBack(): void {
    this.location.back();
  }
}
