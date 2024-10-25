import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CreationInfoComponent } from './creation-info/creation-info.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { OperationalCriteriaComponent } from './operational-criteria/operational-criteria.component';
import { OperationalEligibilitiesComponent } from './operational-eligibilities/operational-eligibilities.component';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MasterDataComponent,
    CreationInfoComponent,
    OperationalCriteriaComponent,
    OperationalEligibilitiesComponent,
  ],
  templateUrl: './customer-form.component.html',
})
export class CustomerFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  customerForm: FormGroup = this.fb.group({
    master_data: [null, Validators.required],
    creation_info: [null, Validators.required],
    operational_criteria: [[]],
    operational_eligibilities: [[]],
  });

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    if (this.customerForm.valid) {
      console.log(this.customerForm.value);
      // Handle form submission
    }
  }
}
