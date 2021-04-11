import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  getControlErrorsList,
  isFieldInvalid,
} from 'src/app/shared/form-field-message/utils/form-field-message.utils';
import { DrugstoreService } from '../../drugstore.service';

@Component({
  selector: 'app-drug-disposal-registration',
  templateUrl: './drug-disposal-registration.page.html',
  styleUrls: ['./drug-disposal-registration.page.scss'],
})
export class DrugDisposalRegistrationPage implements OnInit {
  public disposalRefisterForm: FormGroup;
  public productsFormArray: FormArray;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _drugstoreService: DrugstoreService
  ) {}

  public myProducts: any = [];

  ngOnInit() {
    this._buildForm();
    this.addProduct();

    this._drugstoreService.getProductList().subscribe((res) => {
      this.myProducts = res;
      this.disposalRefisterForm.reset();
    });
  }

  private _buildForm(): void {
    this.productsFormArray = this._fb.array([]);

    this.disposalRefisterForm = this._fb.group({
      documento: this._fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(14)])
      ),
      produtos: this.productsFormArray,
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
        quantidade: this._fb.control(
          0,
          Validators.compose([
            Validators.required,
            Validators.pattern(/[1-9][0-9]*/),
          ])
        ),
      })
    );
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
    this._drugstoreService
      .postGiveBack(this.disposalRefisterForm.value)
      .subscribe(
        (res) => console.log('sucesso', res),
        (error) => console.log('error', error)
      );
  }
}
