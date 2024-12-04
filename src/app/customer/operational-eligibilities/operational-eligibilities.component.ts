import { CommonModule } from '@angular/common';
import { Component, forwardRef, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface OperationalEligibilitiesForm {
  stock_trading: FormControl<boolean>;
  margin_trading: FormControl<boolean>;
  options_trading: FormControl<boolean>;
  futures_trading: FormControl<boolean>;
  crypto_trading: FormControl<boolean>;
}

@Component({
  selector: 'app-operational-eligibilities',
  templateUrl: './operational-eligibilities.component.html',
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule, MatCardModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OperationalEligibilitiesComponent),
      multi: true,
    },
  ],
})
export class OperationalEligibilitiesComponent implements ControlValueAccessor, OnInit {
  form: FormGroup<OperationalEligibilitiesForm>;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group<OperationalEligibilitiesForm>({
      stock_trading: new FormControl(false, { nonNullable: true }),
      margin_trading: new FormControl(false, { nonNullable: true }),
      options_trading: new FormControl(false, { nonNullable: true }),
      futures_trading: new FormControl(false, { nonNullable: true }),
      crypto_trading: new FormControl(false, { nonNullable: true }),
    });
  }

  ngOnInit() {}

  writeValue(val: Partial<{ [K in keyof OperationalEligibilitiesForm]: boolean }>): void {
    if (val) {
      this.form.patchValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.form.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.onTouched();
    });
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

}
