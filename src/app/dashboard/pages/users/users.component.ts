import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from './user.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { Observable, map, tap } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy {
  public users: Observable<User[]>;

  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    private notifier: NotifierService,
    ) {
      this.users = this.userService.getUsers().pipe(
        tap((value)=> console.log('Recibimos los usuarios', value)),
        map((value) => value.map((user) =>({
          ...user,
          name: user.name.toUpperCase()
          }))
          )
        )
      this.userService.loadUsers();
      // this.userService.getUsers().subscribe({
      //   next: (value) => {
      //     this.users = value;
      //   }
      // });
    }

  ngOnDestroy(): void {

  }

  onCreateUser(): void {
    this.matDialog
      .open(UserFormDialogComponent, {
        width: '400px',
      })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if(value){

            // this.users = [
            //   ...this.users,
            //   {
            //     id: this.users.length + 1,
            //     name: value.name,
            //     email: value.email,
            //     lastName: value.lastName,
            //     age: value.age,
            //     course: value.course,
            //   }
            // ];
            this.userService.createUser({
              // id: this.users.length + 1,
              id: new Date().getTime(),
              name: value.name,
              email: value.email,
              lastName: value.lastName,
              age: value.age,
              course: value.course,
            })
            this.notifier.showSuccess('Usuarios cargados', 'Los usuarios se cargaron correctamente');
            console.log('Recibimos el valor',value);
          }else {
            console.log('No recibimos nada');
          }
        }
      })
  }

  onDeleteUser(userToDelete: User): void {
    if(confirm(`¿Está seguro de eliminar al usuario ${userToDelete.name}?`)){
      // this.users = this.users.filter((user) => user.id !== userToDelete.id);
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
          // this.users = this.users.map((user) => {
          //   return user.id === userToEdit.id
          //   ? { ...user, ...userUpdated }
          //   : user;
          // })
        }
      }
    })
  }
}
