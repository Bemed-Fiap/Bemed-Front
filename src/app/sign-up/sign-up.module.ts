import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { FormFieldMessagePageModule } from '../shared/form-field-message/form-field-message.module';
import { ViacepService } from './services/viacep.service';
import { SignUpPageRoutingModule } from './sign-up-routing.module';
import { SignUpPage } from './sign-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPageRoutingModule,
    FormsModule,
    BrMaskerModule,
    ReactiveFormsModule,
    FormFieldMessagePageModule
  ],
  providers: [ViacepService],
  declarations: [SignUpPage]
})
export class SignUpPageModule {}
