import { inject } from 'vue';
import { snackbarConfig } from '../../../config/snackbar';

export function useSnackbar() {
  let snackbar = inject('snackbar');
  const showSnackbar = (text, type) => {
    const config = {
      ...snackbarConfig[type],
      text,
      isActive: true
    };
    snackbar = Object.assign(snackbar, config);
  };

  return { showSnackbar };
}
