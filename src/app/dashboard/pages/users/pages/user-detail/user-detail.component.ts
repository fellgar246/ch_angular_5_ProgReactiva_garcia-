import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [
  ]
})
export class UserDetailComponent {
  public user: User | null = null;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private notification: NotifierService ) {
    console.log(this.activatedRoute.snapshot.params['id']);
    if(!Number(this.activatedRoute.snapshot.params['id'])){
      this.router.navigate(['dashboard', 'users'])
      this.notification.showError('Error',`El id ${this.activatedRoute.snapshot.params['id']}  no es valido`)
    }
  }

}
