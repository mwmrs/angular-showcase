import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SuspensionRowComponent } from './suspension-row/suspension-row.component';

interface SuspensionsForm {
  stock_trading: FormControl<any | null>;
  margin_trading: FormControl<any | null>;
  options_trading: FormControl<any | null>;
  futures_trading: FormControl<any | null>;
  crypto_trading: FormControl<any | null>;
}

@Component({
  selector: 'app-suspensions',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
    SuspensionRowComponent,
  ],
  templateUrl: './suspensions.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SuspensionsComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SuspensionsComponent),
      multi: true,
    },
  ],
})
export class SuspensionsComponent implements ControlValueAccessor, Validator {
  private fb = inject(FormBuilder);

  form = this.fb.group<SuspensionsForm>({
    stock_trading: new FormControl(null),
    margin_trading: new FormControl(null),
    options_trading: new FormControl(null),
    futures_trading: new FormControl(null),
    crypto_trading: new FormControl(null),
  });

  constructor() {
    this.form.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.onTouched();
    });
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const hasEnabledInvalidControls = Object.keys(this.form.controls).some((key) => {
      const control = this.form.get(key);
      return control?.enabled && control?.invalid;
    });

    return hasEnabledInvalidControls ? { invalidForm: true } : null;
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
