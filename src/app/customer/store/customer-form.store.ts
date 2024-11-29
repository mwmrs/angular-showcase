import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { computed } from '@angular/core';

interface CustomerFormState {
  masterData: any | null;
  creationInfo: any | null;
  operationalCriteria: any[];
  operationalEligibilities: { eligibility_name: string; value: boolean }[];
  suspensions: Record<string, { start_date: Date | null; end_date: Date | null; measure: string | null }>;
  eligibilityOptions: string[];
}

const initialState: CustomerFormState = {
  masterData: null,
  creationInfo: null,
  operationalCriteria: [],
  operationalEligibilities: [],
  suspensions: {},
  eligibilityOptions: []
};

export const CustomerFormStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setMasterData(masterData: any) {
      patchState(store, { masterData });
    },
    setCreationInfo(creationInfo: any) {
      patchState(store, { creationInfo });
    },
    setOperationalCriteria(operationalCriteria: any[]) {
      patchState(store, { operationalCriteria });
    },
    setOperationalEligibilities(eligibilities: { eligibility_name: string; value: boolean }[]) {
      patchState(store, { operationalEligibilities: eligibilities });
    },
    setEligibilityOptions(options: string[]) {
      patchState(store, { eligibilityOptions: options });
    },
    updateSuspensions(eligibility: string, isEnabled: boolean) {
      const updatedSuspensions = { ...store.suspensions() };

      if (isEnabled) {
        updatedSuspensions[eligibility] = {
          start_date: null,
          end_date: null,
          measure: null
        };
      } else {
        delete updatedSuspensions[eligibility];
      }

      patchState(store, { suspensions: updatedSuspensions });
    },
    updateSuspensionDetails(
      eligibility: string,
      details: { start_date?: Date; end_date?: Date; measure?: string }
    ) {
      const updatedSuspensions = { ...store.suspensions() };
      updatedSuspensions[eligibility] = {
        ...updatedSuspensions[eligibility],
        ...details
      };
      patchState(store, { suspensions: updatedSuspensions });
    }
  }))
);
