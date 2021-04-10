import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getControlErrorsList, isFieldInvalid } from 'src/app/shared/form-field-message/utils/form-field-message.utils';

@Component({
  selector: 'app-drug-disposal-registration',
  templateUrl: './drug-disposal-registration.page.html',
  styleUrls: ['./drug-disposal-registration.page.scss'],
})
export class DrugDisposalRegistrationPage implements OnInit {

  public disposalRefisterForm: FormGroup;
  public productsFormArray: FormArray;

  constructor(
    private readonly _fb: FormBuilder
  ) { }

  ngOnInit() {
    this._buildForm();
    this.addProduct();
  }

  private _buildForm(): void {

    this.productsFormArray = this._fb.array([]);

    this.disposalRefisterForm = this._fb.group({
      document: this._fb.control('', Validators.compose([Validators.required, Validators.minLength(14)])),
      products: this.productsFormArray
    });
  }

  public addProduct(): void {
    this.productsFormArray.push(
      this._fb.group({
        idProduto: this._fb.control('', Validators.required),
        comBula: this._fb.control(false),
        comReceita: this._fb.control(false),
        comCaixa: this._fb.control(false),
        comNotaFiscal: this._fb.control(false),
        dentroDaValidade: this._fb.control(false),
        quantidade: this._fb.control(0, Validators.compose([Validators.required, Validators.pattern(/[1-9][0-9]*/)]))
      })
    )
  }

  public removeProduct(index: number) {
    this.productsFormArray.removeAt(index);
  }

  public isFieldInvalid(control: AbstractControl): boolean {
    return isFieldInvalid(control);
  }

  public getControlErrorsList(control: AbstractControl): string[] {
    return getControlErrorsList(control);
  }

  public save(): void {
    console.log('cadastro de descarte...');
  }


}
