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
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Add the form interface
interface CreationInfoForm {
  created_at: FormControl<string>;
  reason: FormControl<string>;
  comment: FormControl<string>;
}

@Component({
  selector: 'app-creation-info',
  templateUrl: './creation-info.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreationInfoComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CreationInfoComponent),
      multi: true,
    },
  ],
})
export class CreationInfoComponent implements ControlValueAccessor, Validator {
  form: FormGroup<CreationInfoForm>;
  reasons = [
    'new_account_request',
    'marketing_campaign',
    'customer_support',
    'partner_integration',
    'system_migration',
    'other',
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group<CreationInfoForm>({
      created_at: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      reason: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      comment: new FormControl('', {
        nonNullable: true,
      }),
    });
  }

  onTouched: () => void = () => {};

  writeValue(val: any): void {
    if (val) {
      this.form.setValue(val, { emitEvent: false });
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

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : { invalidForm: true };
  }
}
