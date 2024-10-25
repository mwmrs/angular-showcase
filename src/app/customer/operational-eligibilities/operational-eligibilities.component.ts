import { CommonModule } from '@angular/common';
import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    MatDatepickerModule,
    MatCheckboxModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OperationalEligibilitiesComponent),
      multi: true
    }
  ]
})
export class OperationalEligibilitiesComponent implements ControlValueAccessor, OnInit {
  form: FormGroup;
  eligibilityOptions = ['stock_trading', 'margin_trading', 'options_trading', 'futures_trading', 'crypto_trading'];
  measureOptions = ['suspension', 'exclusion', 'limitation'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      values: this.fb.group({}),
      details: this.fb.group({})
    });
  }

  ngOnInit() {
    this.eligibilityOptions.forEach(option => {
      (this.form.get('values') as FormGroup).addControl(option, this.fb.control(false));
      (this.form.get('details') as FormGroup).addControl(option, this.fb.group({
        start_date: [''],
        end_date: [''],
        measure: ['']
      }));
    });
  }

  onTouched: () => void = () => {};

  writeValue(val: any): void {
    if (val && this.form) {
      // Reset all eligibilities to default values
      this.eligibilityOptions.forEach(option => {
        this.form.get('values')?.get(option)?.patchValue(false);
        this.form.get('details')?.get(option)?.patchValue({
          start_date: '',
          end_date: '',
          measure: ''
        });
      });

      // Set the provided values
      val.forEach((eligibility: any) => {
        if (this.form.get('values')?.get(eligibility.eligibility_name)) {
          this.form.get('values')?.get(eligibility.eligibility_name)?.patchValue(true);
        }
        if (this.form.get('details')?.get(eligibility.eligibility_name)) {
          this.form.get('details')?.get(eligibility.eligibility_name)?.patchValue(eligibility);
        }
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

  getSelectedEligibilities() {
    const values = this.form.get('values')?.value;
    const details = this.form.get('details')?.value;
    return Object.entries(values)
      .filter(([_, value]) => value === true)
      .map(([key, _]) => ({
        eligibility_name: key,
        value: true,
        ...details[key]
      }));
  }
}
