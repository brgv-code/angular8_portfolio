import { OnDestroy, OnInit } from '@angular/core';
import { SnotifyService } from './snotify.service';
import { SnotifyToast } from './toast/snotify-toast.model';
import { Subscription } from 'rxjs';
import { SnotifyNotifications } from './interfaces/SnotifyNotifications.interface';
import { SnotifyEvent } from './types/event.type';
export declare class SnotifyComponent implements OnInit, OnDestroy {
    private service;
    /**
     * Toasts array
     */
    notifications: SnotifyNotifications;
    /**
     * Toasts emitter
     */
    emitter: Subscription;
    /**
     * Helper for slice pipe (maxOnScreen)
     */
    dockSize_a: number;
    /**
     * Helper for slice pipe (maxOnScreen)
     */
    dockSize_b: number | undefined;
    /**
     * Helper for slice pipe (maxAtPosition)
     */
    blockSize_a: number;
    /**
     * Helper for slice pipe (maxAtPosition)
     */
    blockSize_b: number | undefined;
    /**
     * Backdrop Opacity
     */
    backdrop: number;
    /**
     * How many toasts with backdrop in current queue
     */
    withBackdrop: SnotifyToast[];
    constructor(service: SnotifyService);
    /**
     * Init base options. Subscribe to options, lifecycle change
     */
    ngOnInit(): void;
    /**
     * Changes the backdrop opacity
     * @param {SnotifyEvent} event
     */
    stateChanged(event: SnotifyEvent): void;
    /**
     * Split toasts toasts into different objects
     * @param {SnotifyToast[]} toasts
     * @returns {SnotifyNotifications}
     */
    splitToasts(toasts: SnotifyToast[]): SnotifyNotifications;
    /**
     * Unsubscribe subscriptions
     */
    ngOnDestroy(): void;
}
