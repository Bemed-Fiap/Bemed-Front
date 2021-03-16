import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormFieldMessagePage } from './form-field-message.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [FormFieldMessagePage],
  declarations: [FormFieldMessagePage]
})
export class FormFieldMessagePageModule {}
