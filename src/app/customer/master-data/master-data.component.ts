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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface MasterDataForm {
  name: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  group: FormControl<string>;
}

@Component({
  selector: 'app-master-data',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule],
  templateUrl: './master-data.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MasterDataComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MasterDataComponent),
      multi: true,
    },
  ],
})
export class MasterDataComponent implements ControlValueAccessor, Validator {
  form: FormGroup<MasterDataForm>;
  groups = ['Private', 'Corporate', 'Non-Profit', 'Government', 'Educational', 'Small Business', 'Enterprise'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group<MasterDataForm>({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(100)],
      }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.email] }),
      phone: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern('^[0-9]*$')],
      }),
      group: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
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
