import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { FormFieldMessagePageModule } from '../shared/form-field-message/form-field-message.module';
import { ViacepService } from './services/viacep.service';
import { SignInPageRoutingModule } from './sign-in-routing.module';
import { SignInPage } from './sign-in.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInPageRoutingModule,
    FormsModule,
    BrMaskerModule,
    ReactiveFormsModule,
    FormFieldMessagePageModule
  ],
  providers: [ViacepService],
  declarations: [SignInPage]
})
export class SignInPageModule {}
