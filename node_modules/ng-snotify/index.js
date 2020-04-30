import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Injectable, Input, NgModule, Output, Pipe, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, from } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Toast style.
 */
var SnotifyStyle = {
    simple: 'simple',
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
    async: 'async',
    confirm: 'confirm',
    prompt: 'prompt'
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Toast main model
 */
var SnotifyToast = /** @class */ (function () {
    function SnotifyToast(id, title, body, config) {
        var _this = this;
        this.id = id;
        this.title = title;
        this.body = body;
        this.config = config;
        /**
         * Emits {SnotifyEvent}
         */
        this.eventEmitter = new Subject();
        /**
         * Holds all subscribers because we need to unsubscribe from all before toast get destroyed
         */
        this._eventsHolder = [];
        if (this.config.type === SnotifyStyle.prompt) {
            this.value = '';
        }
        this.on('hidden', function () {
            _this._eventsHolder.forEach(function (subscription) {
                subscription.unsubscribe();
            });
        });
    }
    /**
     * Subscribe to toast events
     * @param {SnotifyEvent} event
     * @param {(toast: SnotifyToast) => void} action
     * @returns {this}
     */
    /**
     * Subscribe to toast events
     * @param {?} event
     * @param {?} action
     * @return {?}
     */
    SnotifyToast.prototype.on = /**
     * Subscribe to toast events
     * @param {?} event
     * @param {?} action
     * @return {?}
     */
    function (event, action) {
        var _this = this;
        this._eventsHolder.push(this.eventEmitter.subscribe(function (e) {
            if (e === event) {
                action(_this);
            }
        }));
        return this;
    };
    return SnotifyToast;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Transform arguments to Snotify object
 * @param {?} target
 * @param {?} propertyKey
 * @param {?} descriptor
 * @return {?}
 */
function TransformArgument(target, propertyKey, descriptor) {
    if (propertyKey === SnotifyStyle.async) {
        return {
            value: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var /** @type {?} */ result;
                if (args.length === 2) {
                    result = {
                        title: null,
                        body: args[0],
                        config: null,
                        action: args[1]
                    };
                }
                else if (args.length === 3) {
                    if (typeof args[1] === 'string') {
                        result = {
                            title: args[1],
                            body: args[0],
                            config: null,
                            action: args[2]
                        };
                    }
                    else {
                        result = {
                            title: null,
                            body: args[0],
                            config: args[2],
                            action: args[1]
                        };
                    }
                }
                else {
                    result = {
                        title: args[1],
                        body: args[0],
                        config: args[3],
                        action: args[2]
                    };
                }
                return descriptor.value.apply(this, [/** @type {?} */ (result)]);
            }
        };
    }
    else {
        return {
            value: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var /** @type {?} */ result;
                if (args.length === 1) {
                    result = {
                        title: null,
                        body: args[0],
                        config: null
                    };
                }
                else if (args.length === 3) {
                    result = {
                        title: args[1],
                        body: args[0],
                        config: args[2]
                    };
                }
                else {
                    result = (_a = {
                            title: null,
                            config: null,
                            body: args[0]
                        }, _a[typeof args[1] === 'string' ? 'title' : 'config'] = args[1], _a);
                }
                return descriptor.value.apply(this, [/** @type {?} */ (result)]);
                var _a;
            }
        };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generates random id
 * @return {?}
 */
function uuid() {
    return Math.floor(Math.random() * (Date.now() - 1)) + 1;
}
/**
 * Simple is object check.
 * @param {?} item {Object<any>}
 * @return {?}
 */
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}
/**
 * Deep merge objects.
 * @param {...?} sources {Array<Object<any>>}
 * @return {?}
 */
function mergeDeep() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var /** @type {?} */ target = {};
    if (!sources.length) {
        return target;
    }
    while (sources.length > 0) {
        var /** @type {?} */ source = sources.shift();
        if (isObject(source)) {
            for (var /** @type {?} */ key in source) {
                if (isObject(source[key])) {
                    target[key] = mergeDeep(target[key], source[key]);
                }
                else {
                    Object.assign(target, (_a = {}, _a[key] = source[key], _a));
                }
            }
        }
    }
    return target;
    var _a;
}
/**
 * @param {?} start
 * @param {?} duration
 * @param {?} callback
 * @return {?}
 */

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Defines toast style depending on method name
 * @param {?} target
 * @param {?} propertyKey
 * @param {?} descriptor
 * @return {?}
 */
function SetToastType(target, propertyKey, descriptor) {
    return {
        value: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            (/** @type {?} */ (args[0])).config = __assign({}, (/** @type {?} */ (args[0])).config, { type: propertyKey });
            return descriptor.value.apply(this, args);
        }
    };
}

var __assign$1 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * SnotifyService - create, remove, config toasts
 */
var SnotifyService = /** @class */ (function () {
    function SnotifyService(config) {
        this.config = config;
        this.emitter = new Subject();
        this.toastChanged = new Subject();
        this.toastDeleted = new Subject();
        this.notifications = [];
    }
    /**
     * emit changes in notifications array
     * @return {?}
     */
    SnotifyService.prototype.emit = /**
     * emit changes in notifications array
     * @return {?}
     */
    function () {
        this.emitter.next(this.notifications.slice());
    };
    /**
     * returns SnotifyToast object
     * @param id {Number}
     * @return {SnotifyToast|undefined}
     */
    /**
     * returns SnotifyToast object
     * @param {?} id {Number}
     * @return {?}
     */
    SnotifyService.prototype.get = /**
     * returns SnotifyToast object
     * @param {?} id {Number}
     * @return {?}
     */
    function (id) {
        return this.notifications.find(function (toast) { return toast.id === id; });
    };
    /**
     * add SnotifyToast to notifications array
     * @param {?} toast {SnotifyToast}
     * @return {?}
     */
    SnotifyService.prototype.add = /**
     * add SnotifyToast to notifications array
     * @param {?} toast {SnotifyToast}
     * @return {?}
     */
    function (toast) {
        if (this.config.global.newOnTop) {
            this.notifications.unshift(toast);
        }
        else {
            this.notifications.push(toast);
        }
        this.emit();
    };
    /**
     * If ID passed, emits toast animation remove, if ID & REMOVE passed, removes toast from notifications array
     * @param id {number}
     * @param remove {boolean}
     */
    /**
     * If ID passed, emits toast animation remove, if ID & REMOVE passed, removes toast from notifications array
     * @param {?=} id {number}
     * @param {?=} remove {boolean}
     * @return {?}
     */
    SnotifyService.prototype.remove = /**
     * If ID passed, emits toast animation remove, if ID & REMOVE passed, removes toast from notifications array
     * @param {?=} id {number}
     * @param {?=} remove {boolean}
     * @return {?}
     */
    function (id, remove) {
        if (!id) {
            return this.clear();
        }
        else if (remove) {
            this.notifications = this.notifications.filter(function (toast) { return toast.id !== id; });
            return this.emit();
        }
        this.toastDeleted.next(id);
    };
    /**
     * Clear notifications array
     */
    /**
     * Clear notifications array
     * @return {?}
     */
    SnotifyService.prototype.clear = /**
     * Clear notifications array
     * @return {?}
     */
    function () {
        this.notifications = [];
        this.emit();
    };
    /**
     * Creates toast and add it to array, returns toast id
     * @param snotify {Snotify}
     * @return {number}
     */
    /**
     * Creates toast and add it to array, returns toast id
     * @param {?} snotify {Snotify}
     * @return {?}
     */
    SnotifyService.prototype.create = /**
     * Creates toast and add it to array, returns toast id
     * @param {?} snotify {Snotify}
     * @return {?}
     */
    function (snotify) {
        var /** @type {?} */ config = mergeDeep(this.config.toast, this.config.type[snotify.config.type], snotify.config);
        var /** @type {?} */ toast = new SnotifyToast(uuid(), snotify.title, snotify.body, config);
        this.add(toast);
        return toast;
    };
    /**
     * @param {?} defaults
     * @return {?}
     */
    SnotifyService.prototype.setDefaults = /**
     * @param {?} defaults
     * @return {?}
     */
    function (defaults) {
        return this.config = /** @type {?} */ (mergeDeep(this.config, defaults));
    };
    /**
     * Transform toast arguments into {Snotify} object
     */
    /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    SnotifyService.prototype.simple = /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return this.create(args);
    };
    /**
     * Transform toast arguments into {Snotify} object
     */
    /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    SnotifyService.prototype.success = /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return this.create(args);
    };
    /**
     * Transform toast arguments into {Snotify} object
     */
    /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    SnotifyService.prototype.error = /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return this.create(args);
    };
    /**
     * Transform toast arguments into {Snotify} object
     */
    /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    SnotifyService.prototype.info = /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return this.create(args);
    };
    /**
     * Transform toast arguments into {Snotify} object
     */
    /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    SnotifyService.prototype.warning = /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return this.create(args);
    };
    /**
     * Transform toast arguments into {Snotify} object
     */
    /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    SnotifyService.prototype.confirm = /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return this.create(args);
    };
    /**
     * Transform toast arguments into {Snotify} object
     */
    /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    SnotifyService.prototype.prompt = /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return this.create(args);
    };
    /**
     * Transform toast arguments into {Snotify} object
     */
    /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    SnotifyService.prototype.async = /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    function (args) {
        var _this = this;
        var /** @type {?} */ async;
        if (args.action instanceof Promise) {
            async = from(args.action);
        }
        else {
            async = args.action;
        }
        var /** @type {?} */ toast = this.create(args);
        toast.on('mounted', function () {
            var /** @type {?} */ subscription = async.subscribe(function (next) {
                _this.mergeToast(toast, next);
            }, function (error) {
                _this.mergeToast(toast, error, SnotifyStyle.error);
                subscription.unsubscribe();
            }, function () {
                _this.mergeToast(toast, {}, SnotifyStyle.success);
                subscription.unsubscribe();
            });
        });
        return toast;
    };
    /**
     * @param {?} toast
     * @param {?} next
     * @param {?=} type
     * @return {?}
     */
    SnotifyService.prototype.mergeToast = /**
     * @param {?} toast
     * @param {?} next
     * @param {?=} type
     * @return {?}
     */
    function (toast, next, type) {
        if (next.body) {
            toast.body = next.body;
        }
        if (next.title) {
            toast.title = next.title;
        }
        if (type) {
            toast.config = mergeDeep(toast.config, this.config.global, this.config.toast[type], { type: type }, next.config);
        }
        else {
            toast.config = mergeDeep(toast.config, next.config);
        }
        if (next.html) {
            toast.config.html = next.html;
        }
        this.emit();
        this.toastChanged.next(toast);
    };
    /**
     * Creates empty toast with html string inside
     * @param {string | SafeHtml} html
     * @param {SnotifyToastConfig} config
     * @returns {number}
     */
    /**
     * Creates empty toast with html string inside
     * @param {?} html
     * @param {?=} config
     * @return {?}
     */
    SnotifyService.prototype.html = /**
     * Creates empty toast with html string inside
     * @param {?} html
     * @param {?=} config
     * @return {?}
     */
    function (html, config) {
        return this.create({
            title: null,
            body: null,
            config: __assign$1({}, config, { html: html })
        });
    };
    SnotifyService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SnotifyService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['SnotifyToastConfig',] },] },
    ]; };
    __decorate([
        TransformArgument
        /**
         * Determines current toast type and collects default configuration
         */
        ,
        SetToastType,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", SnotifyToast)
    ], SnotifyService.prototype, "simple", null);
    __decorate([
        TransformArgument
        /**
         * Determines current toast type and collects default configuration
         */
        ,
        SetToastType,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", SnotifyToast)
    ], SnotifyService.prototype, "success", null);
    __decorate([
        TransformArgument
        /**
         * Determines current toast type and collects default configuration
         */
        ,
        SetToastType,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", SnotifyToast)
    ], SnotifyService.prototype, "error", null);
    __decorate([
        TransformArgument
        /**
         * Determines current toast type and collects default configuration
         */
        ,
        SetToastType,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", SnotifyToast)
    ], SnotifyService.prototype, "info", null);
    __decorate([
        TransformArgument
        /**
         * Determines current toast type and collects default configuration
         */
        ,
        SetToastType,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", SnotifyToast)
    ], SnotifyService.prototype, "warning", null);
    __decorate([
        TransformArgument
        /**
         * Determines current toast type and collects default configuration
         */
        ,
        SetToastType,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", SnotifyToast)
    ], SnotifyService.prototype, "confirm", null);
    __decorate([
        TransformArgument
        /**
         * Determines current toast type and collects default configuration
         */
        ,
        SetToastType,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", SnotifyToast)
    ], SnotifyService.prototype, "prompt", null);
    __decorate([
        TransformArgument
        /**
         * Determines current toast type and collects default configuration
         */
        ,
        SetToastType,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", SnotifyToast)
    ], SnotifyService.prototype, "async", null);
    return SnotifyService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Toast position
 */
var SnotifyPosition = /** @class */ (function () {
    function SnotifyPosition() {
    }
    SnotifyPosition.leftTop = 'leftTop';
    SnotifyPosition.leftCenter = 'leftCenter';
    SnotifyPosition.leftBottom = 'leftBottom';
    SnotifyPosition.rightTop = 'rightTop';
    SnotifyPosition.rightCenter = 'rightCenter';
    SnotifyPosition.rightBottom = 'rightBottom';
    SnotifyPosition.centerTop = 'centerTop';
    SnotifyPosition.centerCenter = 'centerCenter';
    SnotifyPosition.centerBottom = 'centerBottom';
    return SnotifyPosition;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SnotifyComponent = /** @class */ (function () {
    function SnotifyComponent(service) {
        this.service = service;
        /**
         * Backdrop Opacity
         */
        this.backdrop = -1;
    }
    /**
     * Init base options. Subscribe to options, lifecycle change
     */
    /**
     * Init base options. Subscribe to options, lifecycle change
     * @return {?}
     */
    SnotifyComponent.prototype.ngOnInit = /**
     * Init base options. Subscribe to options, lifecycle change
     * @return {?}
     */
    function () {
        var _this = this;
        this.emitter = this.service.emitter.subscribe(function (toasts) {
            if (_this.service.config.global.newOnTop) {
                _this.dockSize_a = -_this.service.config.global.maxOnScreen;
                _this.dockSize_b = undefined;
                _this.blockSize_a = -_this.service.config.global.maxAtPosition;
                _this.blockSize_b = undefined;
                _this.withBackdrop = toasts.filter(function (toast) { return toast.config.backdrop >= 0; });
            }
            else {
                _this.dockSize_a = 0;
                _this.dockSize_b = _this.service.config.global.maxOnScreen;
                _this.blockSize_a = 0;
                _this.blockSize_b = _this.service.config.global.maxAtPosition;
                _this.withBackdrop = toasts.filter(function (toast) { return toast.config.backdrop >= 0; }).reverse();
            }
            _this.notifications = _this.splitToasts(toasts.slice(_this.dockSize_a, _this.dockSize_b));
            _this.stateChanged('mounted');
        });
    };
    // TODO: fix backdrop if more than one toast called in a row
    /**
     * Changes the backdrop opacity
     * @param {SnotifyEvent} event
     */
    /**
     * Changes the backdrop opacity
     * @param {?} event
     * @return {?}
     */
    SnotifyComponent.prototype.stateChanged = /**
     * Changes the backdrop opacity
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.withBackdrop.length) {
            if (this.backdrop >= 0) {
                this.backdrop = -1;
            }
            return;
        }
        switch (event) {
            case 'mounted':
                if (this.backdrop < 0) {
                    this.backdrop = 0;
                }
                break;
            case 'beforeShow':
                this.backdrop = this.withBackdrop[this.withBackdrop.length - 1].config.backdrop;
                break;
            case 'beforeHide':
                if (this.withBackdrop.length === 1) {
                    this.backdrop = 0;
                }
                break;
            case 'hidden':
                if (this.withBackdrop.length === 1) {
                    this.backdrop = -1;
                }
                break;
        }
    };
    /**
     * Split toasts toasts into different objects
     * @param {SnotifyToast[]} toasts
     * @returns {SnotifyNotifications}
     */
    /**
     * Split toasts toasts into different objects
     * @param {?} toasts
     * @return {?}
     */
    SnotifyComponent.prototype.splitToasts = /**
     * Split toasts toasts into different objects
     * @param {?} toasts
     * @return {?}
     */
    function (toasts) {
        var /** @type {?} */ result = {};
        for (var /** @type {?} */ property in SnotifyPosition) {
            if (SnotifyPosition.hasOwnProperty(property)) {
                result[SnotifyPosition[property]] = [];
            }
        }
        toasts.forEach(function (toast) {
            result[/** @type {?} */ (toast.config.position)].push(toast);
        });
        return result;
    };
    /**
     * Unsubscribe subscriptions
     */
    /**
     * Unsubscribe subscriptions
     * @return {?}
     */
    SnotifyComponent.prototype.ngOnDestroy = /**
     * Unsubscribe subscriptions
     * @return {?}
     */
    function () {
        this.emitter.unsubscribe();
    };
    SnotifyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-snotify',
                    template: "<div class=\"snotify-backdrop\" *ngIf=\"backdrop >= 0\" [style.opacity]=\"backdrop\"></div> <div *ngFor=\"let position of notifications | keys\" class=\"snotify snotify-{{position}}\"> <ng-snotify-toast *ngFor=\"let notification of notifications[position] | slice:blockSize_a:blockSize_b\" [toast]=\"notification\" (stateChanged)=\"stateChanged($event)\" > </ng-snotify-toast> </div> ",
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    SnotifyComponent.ctorParameters = function () { return [
        { type: SnotifyService, },
    ]; };
    return SnotifyComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ToastComponent = /** @class */ (function () {
    function ToastComponent(service) {
        this.service = service;
        this.stateChanged = new EventEmitter();
        /**
         * Toast state
         */
        this.state = {
            paused: false,
            progress: 0,
            animation: '',
            isDestroying: false,
            promptType: SnotifyStyle.prompt
        };
    }
    // Lifecycles
    /**
     * Init base options. Subscribe to toast changed, toast deleted
     */
    /**
     * Init base options. Subscribe to toast changed, toast deleted
     * @return {?}
     */
    ToastComponent.prototype.ngOnInit = /**
     * Init base options. Subscribe to toast changed, toast deleted
     * @return {?}
     */
    function () {
        var _this = this;
        this.toastChangedSubscription = this.service.toastChanged.subscribe(function (toast) {
            if (_this.toast.id === toast.id) {
                _this.initToast();
            }
        });
        this.toastDeletedSubscription = this.service.toastDeleted.subscribe(function (id) {
            if (_this.toast.id === id) {
                _this.onRemove();
            }
        });
        if (!this.toast.config.timeout) {
            this.toast.config.showProgressBar = false;
        }
        this.toast.eventEmitter.next('mounted');
        this.state.animation = 'snotifyToast--in';
    };
    /**
     * @return {?}
     */
    ToastComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this.stateChanged.emit('beforeShow');
            _this.toast.eventEmitter.next('beforeShow');
            _this.state.animation = _this.toast.config.animation.enter;
        }, this.service.config.toast.animation.time / 5); // time to show toast push animation (snotifyToast--in)
    };
    /**
     * Unsubscribe subscriptions
     */
    /**
     * Unsubscribe subscriptions
     * @return {?}
     */
    ToastComponent.prototype.ngOnDestroy = /**
     * Unsubscribe subscriptions
     * @return {?}
     */
    function () {
        cancelAnimationFrame(this.animationFrame);
        this.toast.eventEmitter.next('destroyed');
        this.toastChangedSubscription.unsubscribe();
        this.toastDeletedSubscription.unsubscribe();
    };
    /*
    Event hooks
     */
    /**
     * Trigger OnClick lifecycle
     */
    /**
     * Trigger OnClick lifecycle
     * @return {?}
     */
    ToastComponent.prototype.onClick = /**
     * Trigger OnClick lifecycle
     * @return {?}
     */
    function () {
        this.toast.eventEmitter.next('click');
        if (this.toast.config.closeOnClick) {
            this.service.remove(this.toast.id);
        }
    };
    /**
     * Trigger beforeDestroy lifecycle. Removes toast
     */
    /**
     * Trigger beforeDestroy lifecycle. Removes toast
     * @return {?}
     */
    ToastComponent.prototype.onRemove = /**
     * Trigger beforeDestroy lifecycle. Removes toast
     * @return {?}
     */
    function () {
        var _this = this;
        this.state.isDestroying = true;
        this.toast.eventEmitter.next('beforeHide');
        this.stateChanged.emit('beforeHide');
        this.state.animation = this.toast.config.animation.exit;
        setTimeout(function () {
            _this.stateChanged.emit('hidden');
            _this.state.animation = 'snotifyToast--out';
            _this.toast.eventEmitter.next('hidden');
            setTimeout(function () { return _this.service.remove(_this.toast.id, true); }, _this.toast.config.animation.time / 2);
        }, this.toast.config.animation.time / 2);
    };
    /**
     * Trigger onHoverEnter lifecycle
     */
    /**
     * Trigger onHoverEnter lifecycle
     * @return {?}
     */
    ToastComponent.prototype.onMouseEnter = /**
     * Trigger onHoverEnter lifecycle
     * @return {?}
     */
    function () {
        this.toast.eventEmitter.next('mouseenter');
        if (this.toast.config.pauseOnHover) {
            this.state.paused = true;
        }
    };
    /**
     * Trigger onHoverLeave lifecycle
     */
    /**
     * Trigger onHoverLeave lifecycle
     * @return {?}
     */
    ToastComponent.prototype.onMouseLeave = /**
     * Trigger onHoverLeave lifecycle
     * @return {?}
     */
    function () {
        if (this.toast.config.pauseOnHover && this.toast.config.timeout) {
            this.state.paused = false;
            this.startTimeout(this.toast.config.timeout * this.state.progress);
        }
        this.toast.eventEmitter.next('mouseleave');
    };
    /**
     * Remove toast completely after animation
     */
    /**
     * Remove toast completely after animation
     * @return {?}
     */
    ToastComponent.prototype.onExitTransitionEnd = /**
     * Remove toast completely after animation
     * @return {?}
     */
    function () {
        if (this.state.isDestroying) {
            return;
        }
        this.initToast();
        this.toast.eventEmitter.next('shown');
    };
    /*
     Common
     */
    /**
     * Initialize base toast config
     *
     */
    /**
     * Initialize base toast config
     *
     * @return {?}
     */
    ToastComponent.prototype.initToast = /**
     * Initialize base toast config
     *
     * @return {?}
     */
    function () {
        if (this.toast.config.timeout > 0) {
            this.startTimeout(0);
        }
    };
    /**
     * Start progress bar
     * @param startTime {number}
     * @default 0
     */
    /**
     * Start progress bar
     * \@default 0
     * @param {?=} startTime {number}
     * @return {?}
     */
    ToastComponent.prototype.startTimeout = /**
     * Start progress bar
     * \@default 0
     * @param {?=} startTime {number}
     * @return {?}
     */
    function (startTime) {
        var _this = this;
        if (startTime === void 0) { startTime = 0; }
        var /** @type {?} */ start = performance.now();
        var /** @type {?} */ calculate = function () {
            _this.animationFrame = requestAnimationFrame(function (timestamp) {
                var /** @type {?} */ runtime = timestamp + startTime - start;
                var /** @type {?} */ progress = Math.min(runtime / _this.toast.config.timeout, 1);
                if (_this.state.paused) {
                    cancelAnimationFrame(_this.animationFrame);
                }
                else if (runtime < _this.toast.config.timeout) {
                    _this.state.progress = progress;
                    calculate();
                }
                else {
                    _this.state.progress = 1;
                    cancelAnimationFrame(_this.animationFrame);
                    _this.service.remove(_this.toast.id);
                }
            });
        };
        calculate();
    };
    ToastComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-snotify-toast',
                    template: "<div [attr.role]=\"toast.config.type === state.promptType ? 'dialog' : 'alert'\" [attr.aria-labelledby]=\"'snotify_'+toast.id\" [attr.aria-modal]=\"toast.config.type === state.promptType\" [ngClass]=\"[ 'snotifyToast animated', 'snotify-' + toast.config.type, state.animation, toast.valid === undefined ? '' : (toast.valid ? 'snotifyToast--valid' : 'snotifyToast--invalid') ]\" [ngStyle]=\"{ '-webkit-transition': toast.config.animation.time + 'ms', transition: toast.config.animation.time + 'ms', '-webkit-animation-duration': toast.config.animation.time + 'ms', 'animation-duration': toast.config.animation.time + 'ms' }\" (animationend)=\"onExitTransitionEnd()\" (click)=\"onClick()\" (mouseenter)=\"onMouseEnter()\" (mouseleave)=\"onMouseLeave()\"> <div class=\"snotifyToast__progressBar\" *ngIf=\"toast.config.showProgressBar\"> <span class=\"snotifyToast__progressBar__percentage\" [ngStyle]=\"{'width': (state.progress * 100) + '%'}\"></span> </div> <div class=\"snotifyToast__inner\" *ngIf=\"!toast.config.html; else toastHTML\"> <div class=\"snotifyToast__title\" [attr.id]=\"'snotify_'+toast.id\" *ngIf=\"toast.title\">{{toast.title | truncate : toast.config.titleMaxLength}}</div> <div class=\"snotifyToast__body\" *ngIf=\"toast.body\">{{toast.body | truncate : toast.config.bodyMaxLength}}</div> <ng-snotify-prompt *ngIf=\"toast.config.type === state.promptType\" [toast]=\"toast\"> </ng-snotify-prompt> <div *ngIf=\"!toast.config.icon; else elseBlock\" [ngClass]=\"['snotify-icon', (toast.config.iconClass || 'snotify-icon--' + toast.config.type)]\"></div> <ng-template #elseBlock> <img class=\"snotify-icon\" [src]='toast.config.icon' /> </ng-template> </div> <ng-template #toastHTML> <div class=\"snotifyToast__inner\" [innerHTML]=\"toast.config.html\"></div> </ng-template> <ng-snotify-button *ngIf=\"toast.config.buttons\" [toast]=\"toast\"></ng-snotify-button> </div> ",
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    ToastComponent.ctorParameters = function () { return [
        { type: SnotifyService, },
    ]; };
    ToastComponent.propDecorators = {
        "toast": [{ type: Input },],
        "stateChanged": [{ type: Output },],
    };
    return ToastComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TruncatePipe = /** @class */ (function () {
    function TruncatePipe() {
    }
    /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    TruncatePipe.prototype.transform = /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var /** @type {?} */ limit = 40;
        var /** @type {?} */ trail = '...';
        if (args.length > 0) {
            limit = args.length > 0 ? parseInt(args[0], 10) : limit;
            trail = args.length > 1 ? args[1] : trail;
        }
        return value.length > limit ? value.substring(0, limit) + trail : value;
    };
    TruncatePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'truncate'
                },] },
    ];
    return TruncatePipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ButtonsComponent = /** @class */ (function () {
    function ButtonsComponent(service) {
        this.service = service;
    }
    /**
     * remove toast
     */
    /**
     * remove toast
     * @return {?}
     */
    ButtonsComponent.prototype.remove = /**
     * remove toast
     * @return {?}
     */
    function () {
        this.service.remove(this.toast.id);
    };
    ButtonsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-snotify-button',
                    template: "<div class=\"snotifyToast__buttons\"> <button type=\"button\" *ngFor=\"let button of toast.config.buttons\" [ngClass]=\"{'snotifyToast__buttons--bold': button.bold}\" (click)=\"button.action ? button.action(toast) : remove()\"> {{button.text}} </button> </div> ",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    ButtonsComponent.ctorParameters = function () { return [
        { type: SnotifyService, },
    ]; };
    ButtonsComponent.propDecorators = {
        "toast": [{ type: Input },],
    };
    return ButtonsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PromptComponent = /** @class */ (function () {
    function PromptComponent() {
        /**
         * Is PROMPT focused
         */
        this.isPromptFocused = false;
    }
    PromptComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-snotify-prompt',
                    template: "<span class=\"snotifyToast__input\" [ngClass]=\"{'snotifyToast__input--filled': isPromptFocused}\"> <input (input)=\"toast.value = $event.target.value; toast.eventEmitter.next('input')\" autofocus class=\"snotifyToast__input__field\" type=\"text\" [id]=\"toast.id\" (focus)=\"isPromptFocused = true\" (blur)=\"isPromptFocused = !!toast.value.length;\"/> <label class=\"snotifyToast__input__label\" [for]=\"toast.id\"> <span class=\"snotifyToast__input__labelContent\">{{toast.config.placeholder | truncate}}</span> </label> </span> ",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    PromptComponent.propDecorators = {
        "toast": [{ type: Input },],
    };
    return PromptComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var KeysPipe = /** @class */ (function () {
    function KeysPipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    KeysPipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    function (value, args) {
        if (args === void 0) { args = null; }
        if (!value) {
            return value;
        }
        return Object.keys(value);
    };
    KeysPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'keys',
                    pure: false
                },] },
    ];
    return KeysPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Snotify default configuration object
 */
var ToastDefaults = {
    global: {
        newOnTop: true,
        maxOnScreen: 8,
        maxAtPosition: 8
    },
    toast: {
        type: SnotifyStyle.simple,
        showProgressBar: true,
        timeout: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        bodyMaxLength: 150,
        titleMaxLength: 16,
        backdrop: -1,
        icon: null,
        iconClass: null,
        html: null,
        position: SnotifyPosition.rightBottom,
        animation: { enter: 'fadeIn', exit: 'fadeOut', time: 400 }
    },
    type: (_a = {}, _a[SnotifyStyle.prompt] = {
            timeout: 0,
            closeOnClick: false,
            buttons: [
                { text: 'Ok', action: null, bold: true },
                { text: 'Cancel', action: null, bold: false },
            ],
            placeholder: 'Enter answer here...',
            type: SnotifyStyle.prompt,
        }, _a[SnotifyStyle.confirm] = {
            timeout: 0,
            closeOnClick: false,
            buttons: [
                { text: 'Ok', action: null, bold: true },
                { text: 'Cancel', action: null, bold: false },
            ],
            type: SnotifyStyle.confirm,
        }, _a[SnotifyStyle.simple] = {
            type: SnotifyStyle.simple
        }, _a[SnotifyStyle.success] = {
            type: SnotifyStyle.success
        }, _a[SnotifyStyle.error] = {
            type: SnotifyStyle.error
        }, _a[SnotifyStyle.warning] = {
            type: SnotifyStyle.warning
        }, _a[SnotifyStyle.info] = {
            type: SnotifyStyle.info
        }, _a[SnotifyStyle.async] = {
            pauseOnHover: false,
            closeOnClick: false,
            timeout: 0,
            showProgressBar: false,
            type: SnotifyStyle.async
        }, _a)
};
var _a;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SnotifyModule = /** @class */ (function () {
    function SnotifyModule() {
    }
    /**
     * @return {?}
     */
    SnotifyModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: SnotifyModule,
            providers: [SnotifyService]
        };
    };
    SnotifyModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        SnotifyComponent, ToastComponent, TruncatePipe,
                        ButtonsComponent, PromptComponent, KeysPipe
                    ],
                    exports: [
                        SnotifyComponent, TruncatePipe, KeysPipe
                    ]
                },] },
    ];
    return SnotifyModule;
}());

export { SnotifyModule, SnotifyComponent, SnotifyService, SnotifyPosition, SnotifyToast, ToastComponent, TruncatePipe, KeysPipe, ButtonsComponent, PromptComponent, ToastDefaults };
