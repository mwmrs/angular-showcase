import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
    MatIconModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OperationalCriteriaComponent),
      multi: true
    }
  ]
})
export class OperationalCriteriaComponent implements ControlValueAccessor {
  form: FormGroup;
  criteriaOptions = ['settlement account', 'custody account', 'pledge account', 'securities account', 'other'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      criteria: this.fb.array([])
    });
  }

  get criteria(): FormArray {
    return this.form.get('criteria') as FormArray;
  }

  addCriteria() {
    this.criteria.push(this.fb.group({
      name: ['', Validators.required],
      value: [false]
    }));
  }

  removeCriteria(index: number) {
    this.criteria.removeAt(index);
  }

  onTouched: () => void = () => {};

  writeValue(val: any): void {
    if (val) {
      this.criteria.clear();
      val.forEach((criterion: any) => {
        this.criteria.push(this.fb.group(criterion));
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
