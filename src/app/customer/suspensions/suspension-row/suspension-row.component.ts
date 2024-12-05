import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ReactiveFormsModule,
  Validator,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
  template: `
    <div [formGroup]="form" style="display: flex; gap: 16px">
      <mat-form-field>
        <mat-label>Start Date</mat-label>
        <input matInput [matDatepicker]="startPicker" formControlName="start_date" />
        <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
        <mat-datepicker #startPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>End Date</mat-label>
        <input matInput [matDatepicker]="endPicker" formControlName="end_date" />
        <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
        <mat-datepicker #endPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Measure</mat-label>
        <mat-select formControlName="measure">
          <mat-option *ngFor="let measureOption of measureOptions" [value]="measureOption">
            {{ measureOption | titlecase }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
})
export class SuspensionRowComponent implements ControlValueAccessor, Validator {
  form: FormGroup;
  measureOptions = ['suspension', 'exclusion', 'limitation'];
  disabled = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      start_date: [null, Validators.required],
      end_date: [null],
      measure: [null, Validators.required],
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
