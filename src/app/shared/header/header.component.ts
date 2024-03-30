import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserInterface } from '../../interfaces/user.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  /**
   * @description
   * Input property for the list of users.
   *
   * @type {UserInterface[]}
   * @default []
   */
  @Input() userList: UserInterface[] = [];

  /**
   * @description
   * Output event emitted when the user list changes.
   *
   * @type {EventEmitter<any>}
   */
  @Output() userListChange = new EventEmitter<any>();

  /**
   * @description
   * Method to search for a user by their ID.
   *
   * @param {Event} userId The event containing the user ID input.
   */
  searchUser(userId: Event): void {
    if ((userId.target as HTMLInputElement).value !== '') {
      const userIdValue = parseInt((userId.target as HTMLInputElement).value);
      console.log(userIdValue);

      if (userIdValue) {
        this.userListChange.emit(userIdValue);
      }
    } else {
      this.userListChange.emit();
    }
  }
}
