import { CommonModule } from '@angular/common';
import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-operational-criteria',
  templateUrl: './operational-criteria.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OperationalCriteriaComponent),
      multi: true
    }
  ]
})
export class OperationalCriteriaComponent implements ControlValueAccessor, OnInit {
  form: FormGroup;
  criteriaOptions = ['settlement account', 'custody account', 'pledge account', 'securities account', 'other'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
    this.criteriaOptions.forEach(option => {
      this.form.addControl(option, this.fb.control(false));
    });
  }

  ngOnInit() {}

  onTouched: () => void = () => {};

  writeValue(val: any): void {
    if (val && this.form) {
      // Reset all criteria to false
      this.criteriaOptions.forEach(option => {
        this.form.get(option)?.setValue(false);
      });

      // Set the provided values to true
      val.forEach((criterion: any) => {
        if (this.form.get(criterion.name)) {
          this.form.get(criterion.name)?.setValue(true);
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

  getSelectedCriteria() {
    return Object.entries(this.form.value)
      .filter(([_, value]) => value === true)
      .map(([key, _]) => ({ name: key, value: true }));
  }
}
