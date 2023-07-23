import { Injectable } from '@angular/core';
import { User } from './models';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
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

  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  constructor() {}

  loadUsers(): void {
    this._users$.next(this.users);
  }

  getUsers(): Subject<User[]> {
    return this._users$
  }

  createUser(user: User): void {
    this.users = [
      ...this.users,
      user,
    ]
  }
}
