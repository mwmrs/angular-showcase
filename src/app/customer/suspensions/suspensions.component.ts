import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-suspensions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './suspensions.component.html',
  styleUrl: './suspensions.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SuspensionsComponent),
      multi: true,
    },
  ],
})
export class SuspensionsComponent implements ControlValueAccessor {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  onTouched: () => void = () => {};

  writeValue(val: any): void {
    console.log(val);
  }

  registerOnChange(fn: any): void {
    console.log(fn);
  }

  registerOnTouched(fn: any): void {
    console.log(fn);
  }
}
