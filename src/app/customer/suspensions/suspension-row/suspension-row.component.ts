import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface SuspensionRowForm {
  start_date: FormControl<Date | null>;
  end_date: FormControl<Date | null>;
  measure: FormControl<string | null>;
}

@Component({
  selector: 'app-suspension-row',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  templateUrl: './suspension-row.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SuspensionRowComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SuspensionRowComponent),
      multi: true,
    },
  ],
})
export class SuspensionRowComponent implements ControlValueAccessor, Validator {
  form: FormGroup<SuspensionRowForm>;
  measureOptions = ['suspension', 'exclusion', 'limitation'];
  disabled = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group<SuspensionRowForm>({
      start_date: new FormControl<Date | null>(null, {
        validators: [Validators.required],
      }),
      end_date: new FormControl<Date | null>(null),
      measure: new FormControl<string | null>(null, {
        validators: [Validators.required],
      }),
    });

    this.form.valueChanges.subscribe((value) => {
      if (!this.disabled) {
        this.onChange(value);
        this.onTouched();
      }
    });
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    if (value) {
      this.form.patchValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.form.valid) {
      return {
        suspensionRow: {
          valid: false,
          message: 'Suspension row is invalid',
          errors: this.form.errors,
        },
      };
    }

    const startDate = this.form.get('start_date')?.value;
    const endDate = this.form.get('end_date')?.value;

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return {
        dateRange: {
          valid: false,
          message: 'End date must be after start date',
        },
      };
    }

    return null;
  }
}
