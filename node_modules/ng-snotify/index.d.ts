import { ModuleWithProviders } from '@angular/core';
export * from './snotify/snotify.component';
export * from './snotify/snotify.service';
export * from './snotify/interfaces/Snotify.interface';
export * from './snotify/interfaces/SnotifyButton.interface';
export * from './snotify/interfaces/SnotifyToastConfig.interface';
export * from './snotify/interfaces/SnotifyNotifications.interface';
export * from './snotify/enums/SnotifyPosition.enum';
export * from './snotify/toast/snotify-toast.model';
export * from './snotify/toast/toast.component';
export * from './snotify/pipes/truncate.pipe';
export * from './snotify/pipes/keys.pipe';
export * from './snotify/toast/button/buttons.component';
export * from './snotify/toast/prompt/prompt.component';
export * from './snotify/toastDefaults';
export declare class SnotifyModule {
    static forRoot(): ModuleWithProviders;
}
