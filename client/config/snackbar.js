import { PrimeIcons } from 'primevue/api';

export const snackbarConfig = {
  success: {
    icon: PrimeIcons.CHECK_CIRCLE,
    title: 'Success',
    className: 'success'
  },
  error: {
    icon: PrimeIcons.TIMES_CIRCLE,
    title: 'Error',
    className: 'error'
  },
  warning: {
    icon: PrimeIcons.EXCLAMATION_TRIANGLE,
    title: 'Warning',
    className: 'warning'
  },
  info: {
    icon: PrimeIcons.INFO_CIRCLE,
    title: 'Info'
  }
};
