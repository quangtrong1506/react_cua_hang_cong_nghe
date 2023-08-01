import { toast } from 'react-toastify';
export const showToast = ({ message = '', position = 'top-center', type = 'default' }) => {
    toast[type](message, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};
