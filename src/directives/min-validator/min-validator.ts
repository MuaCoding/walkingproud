import { Directive, Input, SimpleChanges, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl, ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[min][formControlName],[min][formControl],[min][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MinValidatorDirective),
    multi: true
  }],
  host: { '[attr.min]': 'min ? min : null' }
})
export class MinValidatorDirective implements Validator {

  private _validator: ValidatorFn;
  private _onChange: () => void;

  @Input() min: string;

  ngOnChanges(changes: SimpleChanges): void {
    if ('min' in changes) {
      this._createValidator();
      if (this._onChange) this._onChange();
    }
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.min == null ? null : this._validator(c);
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  private _createValidator(): void {
    this._validator = Validators.min(parseInt(this.min));
  }

}
