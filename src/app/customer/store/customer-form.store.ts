import { signalStore, withMethods, withState, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';

interface CustomerFormState {
  eligibilities: {
    stock_trading: boolean;
    margin_trading: boolean;
    options_trading: boolean;
    futures_trading: boolean;
    crypto_trading: boolean;
  };
}

const initialState: CustomerFormState = {
  eligibilities: {
    stock_trading: false,
    margin_trading: false,
    options_trading: false,
    futures_trading: false,
    crypto_trading: false,
  },
};

export const CustomerFormStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    updateEligibility(key: keyof CustomerFormState['eligibilities'], value: boolean) {
      patchState(store, (state) => ({
        eligibilities: {
          ...state.eligibilities,
          [key]: value,
        },
      }));
    },
    // Computed signals for each suspension's disabled state
    suspensionDisabledState: computed(() => ({
      stock_trading: !store.eligibilities().stock_trading,
      margin_trading: !store.eligibilities().margin_trading,
      options_trading: !store.eligibilities().options_trading,
      futures_trading: !store.eligibilities().futures_trading,
      crypto_trading: !store.eligibilities().crypto_trading,
    })),
  }))
);
