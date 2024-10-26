import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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
import { SuspensionsComponent } from './suspensions/suspensions.component';

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
    SuspensionsComponent,
  ],
  templateUrl: './customer-form.component.html',
})
export class CustomerFormComponent implements OnInit, AfterViewInit {
  @ViewChild(SuspensionsComponent) suspensionsComponent!: SuspensionsComponent;
  @ViewChild(OperationalEligibilitiesComponent) operationalEligibilitiesComponent!: OperationalEligibilitiesComponent;

  customerForm: FormGroup;
  eligibilityOptions: string[] = [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.customerForm = this.fb.group({
      master_data: [null, Validators.required],
      creation_info: [null, Validators.required],
      operational_criteria: [[]],
      operational_eligibilities: [[]],
      suspensions: [{}]
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.operationalEligibilitiesComponent) {
      this.eligibilityOptions = this.operationalEligibilitiesComponent.eligibilityOptions;
      this.cdr.detectChanges();
    }
  }

  onSubmit() {
    if (this.customerForm.valid) {
      console.log(this.customerForm.value);
      // Handle form submission
    }
  }

  onEligibilityChanged(event: {eligibility: string, checked: boolean}) {
    if (this.suspensionsComponent) {
      this.suspensionsComponent.updateEligibilityStatus(event.eligibility, event.checked);
    }
  }
}
