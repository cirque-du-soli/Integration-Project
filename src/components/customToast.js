import { toast } from 'react-toastify';

export function newToastMessage(toastType, msg) { // toastType: 'success', 'error', TBD...
    let options = {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        pauseOnFocusLoss: false,
        rtl: false,
    }
    switch (toastType) {
        case 'success':
            toast.success(msg, options);
            break;
        case 'error':
            toast.error(msg, options);
            break;
        case 'info':
            toast.info(msg, options);
            break;
        case 'warning':
            toast.warning(msg, options);
            break;
        default:
            toast.info(msg, options);
            break;
    }
}