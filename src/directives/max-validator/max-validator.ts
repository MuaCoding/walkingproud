import { Directive, Input, SimpleChanges, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl, ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[max][formControlName],[max][formControl],[max][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MaxValidatorDirective),
    multi: true
  }],
  host: { '[attr.max]': 'max ? max : null' }
})
export class MaxValidatorDirective implements Validator {
  private _validator: ValidatorFn;
  private _onChange: () => void;

  @Input() max: string;

  ngOnChanges(changes: SimpleChanges): void {
    if ('max' in changes) {
      this._createValidator();
      if (this._onChange) this._onChange();
    }
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.max == null ? null : this._validator(c);
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  private _createValidator(): void {
    this._validator = Validators.max(parseInt(this.max));
  }

}
