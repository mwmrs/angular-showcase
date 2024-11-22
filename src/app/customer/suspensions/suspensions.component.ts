import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
    ],
    templateUrl: './suspensions.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SuspensionsComponent),
            multi: true,
        },
    ]
})
export class SuspensionsComponent implements ControlValueAccessor, OnInit, OnChanges {
  eligibilityOptions = input<string[]>([]);

  form: FormGroup;
  measureOptions = ['suspension', 'exclusion', 'limitation'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.setupFormControls();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['eligibilityOptions']) {
      this.setupFormControls();
    }
  }

  private setupFormControls() {
    // Remove controls that are no longer in eligibilityOptions
    Object.keys(this.form.controls).forEach((key) => {
      if (!this.eligibilityOptions().includes(key)) {
        this.form.removeControl(key);
      }
    });

    // Add new controls
    this.eligibilityOptions().forEach((option) => {
      if (!this.form.contains(option)) {
        const detailsGroup = this.fb.group({
          start_date: [''],
          end_date: [''],
          measure: [''],
        });
        this.form.addControl(option, detailsGroup);
        detailsGroup.disable();
      }
    });
  }

  updateEligibilityStatus(eligibility: string, isChecked: boolean) {
    const control = this.form.get(eligibility);
    if (control) {
      if (isChecked) {
        control.enable();
      } else {
        control.disable();
        control.reset();
      }
    }
  }

  onTouched: () => void = () => {};

  writeValue(val: any): void {
    if (val && this.form) {
      Object.keys(val).forEach((key) => {
        if (this.form.get(key)) {
          this.form.get(key)?.patchValue(val[key]);
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
}
