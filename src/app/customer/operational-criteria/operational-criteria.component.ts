import { CommonModule } from '@angular/common';
import { Component, forwardRef, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface OperationalCriteriaForm {
  settlement_account: FormControl<boolean>;
  custody_account: FormControl<boolean>;
  pledge_account: FormControl<boolean>;
  securities_account: FormControl<boolean>;
  other: FormControl<boolean>;
}

@Component({
  selector: 'app-operational-criteria',
  templateUrl: './operational-criteria.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OperationalCriteriaComponent),
      multi: true,
    },
  ],
})
export class OperationalCriteriaComponent implements ControlValueAccessor, OnInit {
  form: FormGroup<OperationalCriteriaForm>;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group<OperationalCriteriaForm>({
      settlement_account: new FormControl(false, { nonNullable: true }),
      custody_account: new FormControl(false, { nonNullable: true }),
      pledge_account: new FormControl(false, { nonNullable: true }),
      securities_account: new FormControl(false, { nonNullable: true }),
      other: new FormControl(false, { nonNullable: true }),
    });
  }

  ngOnInit() {}

  writeValue(val: Partial<{ [K in keyof OperationalCriteriaForm]: boolean }>): void {
    if (val) {
      this.form.patchValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
    this.form.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.onTouched();
    });
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable({ emitEvent: false });
    } else {
      this.form.enable({ emitEvent: false });
    }
  }

}
