import { Component, forwardRef, inject, OnInit } from '@angular/core';
import { CustomerFormStore } from '../store/customer-form.store';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OperationalEligibilitiesComponent),
      multi: true,
    },
  ],
})
export class OperationalEligibilitiesComponent implements ControlValueAccessor, OnInit {
  private store = inject(CustomerFormStore);
  private fb = inject(FormBuilder);

  form = this.fb.group<OperationalEligibilitiesForm>({
    stock_trading: new FormControl(false, { nonNullable: true }),
    margin_trading: new FormControl(false, { nonNullable: true }),
    options_trading: new FormControl(false, { nonNullable: true }),
    futures_trading: new FormControl(false, { nonNullable: true }),
    crypto_trading: new FormControl(false, { nonNullable: true }),
  });

  ngOnInit() {
    this.form.valueChanges.subscribe((values) => {
      Object.entries(values).forEach(([key, value]) => {
        this.store.updateEligibility(key as any, !!value);
      });
      this.onChange(values);
      this.onTouched();
    });
  }

  private onChange: any = () => {};
  private onTouched: any = () => {};

  writeValue(val: any): void {
    if (val) {
      this.form.patchValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }
}
