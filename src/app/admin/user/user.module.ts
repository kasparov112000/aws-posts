import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { USER_ROUTES } from './user.routes';


@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(USER_ROUTES)
  ],
  declarations: [    
     
  ]
})
export class UserModule { }
