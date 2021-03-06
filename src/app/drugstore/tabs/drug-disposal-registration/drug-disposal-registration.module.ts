import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrugDisposalRegistrationPageRoutingModule } from './drug-disposal-registration-routing.module';

import { DrugDisposalRegistrationPage } from './drug-disposal-registration.page';
import { FormFieldMessagePageModule } from 'src/app/shared/form-field-message/form-field-message.module';
import { BrMaskerModule } from 'br-mask';
import { HeaderPageModule } from 'src/app/shared/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrugDisposalRegistrationPageRoutingModule,
    ReactiveFormsModule,
    BrMaskerModule,
    FormFieldMessagePageModule,
    HeaderPageModule
  ],
  declarations: [DrugDisposalRegistrationPage]
})
export class DrugDisposalRegistrationPageModule {}
