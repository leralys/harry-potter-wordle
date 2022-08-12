import { toast } from 'react-toastify';
export const notifyError = (msg: string = '🧙‍♂️Something went wrong:(') =>
  toast(msg);
