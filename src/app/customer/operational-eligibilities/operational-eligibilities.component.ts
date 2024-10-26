import { CommonModule } from '@angular/common';
import { Component, forwardRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-operational-eligibilities',
  templateUrl: './operational-eligibilities.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatCardModule
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
  @Output() eligibilityChanged = new EventEmitter<{eligibility: string, checked: boolean}>();

  form: FormGroup;
  eligibilityOptions = ['stock_trading', 'margin_trading', 'options_trading', 'futures_trading', 'crypto_trading'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      values: this.fb.group({})
    });
  }

  ngOnInit() {
    this.setupFormControls();
  }

  private setupFormControls() {
    this.eligibilityOptions.forEach(option => {
      const valueControl = this.fb.control(false);
      (this.form.get('values') as FormGroup).addControl(option, valueControl);

      valueControl.valueChanges.subscribe((isChecked: boolean | null) => {
        if (isChecked !== null) {
          this.eligibilityChanged.emit({ eligibility: option, checked: isChecked });
        }
      });
    });
  }

  onTouched: () => void = () => {};

  writeValue(val: any): void {
    if (val && this.form) {
      // Reset all eligibilities to default values
      this.eligibilityOptions.forEach(option => {
        this.form.get('values')?.get(option)?.patchValue(false);
      });

      // Set the provided values
      val.forEach((eligibility: any) => {
        if (this.form.get('values')?.get(eligibility.eligibility_name)) {
          this.form.get('values')?.get(eligibility.eligibility_name)?.patchValue(true);
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
    return Object.entries(values)
      .filter(([_, value]) => value === true)
      .map(([key, _]) => ({
        eligibility_name: key,
        value: true
      }));
  }
}
