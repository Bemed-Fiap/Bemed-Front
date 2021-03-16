import { Component, Input } from '@angular/core';
import { formFieldMessages } from './consts/form-field-message.consts';

@Component({
  selector: 'app-form-field-message',
  templateUrl: './form-field-message.page.html',
  styleUrls: ['./form-field-message.page.scss'],
})
export class FormFieldMessagePage {

  @Input() formFieldName: string;
  @Input() controlErrors: string[];

  public formFieldMessages = formFieldMessages;

  constructor() { }

  public getValidationsErrors(): string[] {
    let errors = [];
    if (this.controlErrors.length) {
      errors = this.controlErrors.map(error => this.formFieldMessages[this.formFieldName][error]);
    }
    return errors;
  }

}
