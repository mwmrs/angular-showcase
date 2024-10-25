import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-operational-eligibilities',
  templateUrl: './operational-eligibilities.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OperationalEligibilitiesComponent),
      multi: true
    }
  ]
})
export class OperationalEligibilitiesComponent implements ControlValueAccessor {
  form: FormGroup;
  eligibilityOptions = ['stock_trading', 'margin_trading', 'options_trading', 'futures_trading', 'crypto_trading'];
  measureOptions = ['suspension', 'exclusion', 'limitation'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      eligibilities: this.fb.array([])
    });
  }

  get eligibilities(): FormArray {
    return this.form.get('eligibilities') as FormArray;
  }

  addEligibility() {
    this.eligibilities.push(this.fb.group({
      eligibility_name: ['', Validators.required],
      value: [false],
      suspension: [false],
      start_date: [''],
      end_date: [''],
      measure: ['']
    }));
  }

  removeEligibility(index: number) {
    this.eligibilities.removeAt(index);
  }

  onTouched: () => void = () => {};

  writeValue(val: any): void {
    if (val) {
      this.eligibilities.clear();
      val.forEach((eligibility: any) => {
        this.eligibilities.push(this.fb.group(eligibility));
      });
    }
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }
}
