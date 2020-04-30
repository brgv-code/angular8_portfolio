import { SnotifyToastConfig } from '../interfaces/SnotifyToastConfig.interface';
import { Subject } from 'rxjs';
import { SnotifyEvent } from '../types/event.type';
/**
 * Toast main model
 */
export declare class SnotifyToast {
    id: number;
    title: string;
    body: string;
    config: SnotifyToastConfig;
    /**
     * Emits {SnotifyEvent}
     * @type {Subject<SnotifyEvent>}
     */
    readonly eventEmitter: Subject<SnotifyEvent>;
    /**
     * Holds all subscribers because we need to unsubscribe from all before toast get destroyed
     * @type {Subscription[]}
     * @private
     */
    private _eventsHolder;
    /**
     * Toast prompt value
     */
    value: string;
    /**
     * Toast validator
     */
    valid: boolean;
    constructor(id: number, title: string, body: string, config: SnotifyToastConfig);
    /**
     * Subscribe to toast events
     * @param {SnotifyEvent} event
     * @param {(toast: SnotifyToast) => void} action
     * @returns {this}
     */
    on(event: SnotifyEvent, action: (toast: this) => void): this;
}
