import { SnotifyService } from '../../snotify.service';
import { SnotifyToast } from '../snotify-toast.model';
export declare class ButtonsComponent {
    private service;
    /**
     * Get buttons Array
     */
    toast: SnotifyToast;
    constructor(service: SnotifyService);
    /**
     * remove toast
     */
    remove(): void;
}
