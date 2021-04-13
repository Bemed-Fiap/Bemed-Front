import { AbstractControl } from "@angular/forms";

export const getControlErrorsList = (control: AbstractControl) => Object.keys(control.errors);

export const isFieldInvalid = (control: AbstractControl): boolean => {
    if (control) {
        return control.invalid && control.touched;
    }
    return false;
}