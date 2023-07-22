import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { UsersModule } from './pages/users/users.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    SharedModule,
    UsersModule,
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
