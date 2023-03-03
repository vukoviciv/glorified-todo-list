import { PrimeIcons } from 'primevue/api';

export const types = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};

export const snackbarConfig = {
  [types.SUCCESS]: {
    icon: PrimeIcons.CHECK_CIRCLE,
    title: 'Success',
    className: 'success'
  },
  [types.ERROR]: {
    icon: PrimeIcons.TIMES_CIRCLE,
    title: 'Error',
    className: 'error'
  },
  [types.WARNING]: {
    icon: PrimeIcons.EXCLAMATION_TRIANGLE,
    title: 'Warning',
    className: 'warning'
  },
  [types.INFO]: {
    icon: PrimeIcons.INFO_CIRCLE,
    title: 'Info'
  }
};
