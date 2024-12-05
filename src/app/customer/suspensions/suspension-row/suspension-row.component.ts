import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
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
export class SuspensionRowComponent implements ControlValueAccessor {
  form: FormGroup;
  measureOptions = ['suspension', 'exclusion', 'limitation'];
  disabled = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      start_date: [null],
      end_date: [null],
      measure: [null],
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
}
