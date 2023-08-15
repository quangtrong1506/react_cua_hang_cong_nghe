import { toast } from 'react-toastify';
export const showToast = ({
    message = '',
    position = 'top-center',
    type = 'default',
    time = 3000,
}) => {
    toast[type](message, {
        position: position || 'top-center',
        autoClose: time || 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: 'light',
    });
};
