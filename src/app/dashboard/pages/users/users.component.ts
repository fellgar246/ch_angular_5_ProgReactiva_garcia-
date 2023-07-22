import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';

const ELEMENT_DATA: User[] = [
  {
    id: 1,
    name: 'Juan',
    lastName: 'Perez',
    email: 'juan@mail.com',
    age: 25,
    course: 'Angular',
  },
  {
    id: 2,
    name: 'Maria',
    lastName: 'Gomez',
    email: 'maria@email.com',
    age: 30,
    course: 'React',
  },
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  public users: User[] = ELEMENT_DATA

  constructor(private matDialog: MatDialog ) { }

  onCreateUser(): void {
    this.matDialog
      .open(UserFormDialogComponent, {
        width: '400px',
      })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if(value){

            this.users = [
              ...this.users,
              {
                id: this.users.length + 1,
                name: value.name,
                email: value.email,
                lastName: value.lastName,
                age: value.age,
                course: value.course,
              }
            ];

            console.log('Recibimos el valor',value);
          }else {
            console.log('No recibimos nada');
          }
        }
      })
  }

  onDeleteUser(userToDelete: User): void {
    if(confirm(`¿Está seguro de eliminar al usuario ${userToDelete.name}?`)){
      this.users = this.users.filter((user) => user.id !== userToDelete.id);
    }
  }

  onEditUser(userToEdit: User): void {
    this.matDialog
    .open(UserFormDialogComponent, {
      data: userToEdit,
    })
    .afterClosed()
    .subscribe({
      next: (userUpdated) => {
        if(userUpdated){
          this.users = this.users.map((user) => {
            return user.id === userToEdit.id
            ? { ...user, ...userUpdated }
            : user;
          })
        }
      }
    })
  }
}
