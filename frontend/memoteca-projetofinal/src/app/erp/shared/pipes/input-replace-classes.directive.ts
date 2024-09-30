import { AfterViewInit, Directive, ElementRef, HostListener, Inject, Injector, OnDestroy, Optional, Renderer2 } from "@angular/core";
import { FormControl, FormControlDirective, FormControlName, FormGroupDirective, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgControl } from '@angular/forms';
import { InputDirective } from "../directives/input.directive";
import { AppConfig } from "src/app/app.config";


@Directive({
    selector:
        `
        textarea[formControlName],
        textarea[formControl],
        textarea[ngModel],
        textarea.form-control:not(.app-ignore),
        input.form-control:not(.app-ignore):not([type=checkbox]):not([type=number]):not([type=radio]):not([type=file]):not(.app-datepicker):not(.app-input):not(.app-input-file)
        `
})
export class InputReplaceClassesDirective implements AfterViewInit, OnDestroy {

    private _observer: MutationObserver;
    myIcon: any;
    inputGroupDiv: any;
    hasIcon = true;
    disabled = false;
    formControl!: FormControl;
    hasValidators = false;

    @HostListener("focus")
    onFocus() {

        if (!this.disabled) {
            this.addFocus();
        }
    }

    @HostListener("focusout")
    onFocusOut() {

        if (!this.disabled) {
            this.removeFocus();
        }
    }

    @HostListener("keydown.tab")
    onKeyDownShift() {

        if (!this.disabled) {
            this.removeFocus();
        }
    }

    @HostListener("keydown.shift.tab")
    onKeyDownShiftTab() {

        if (!this.disabled) {
            this.removeFocus();
        }
    }

    @HostListener("keydown", ['$event'])
    onKeyDown(e) {

        if (!this.disabled && e.key !== 'Tab') {
            setTimeout(() => {
                this.addIcon();
                this.addFocus();
            });
        }
    }

    constructor(
        private el: ElementRef,
        private render: Renderer2,
        @Inject(Injector) private injector: Injector,
        @Optional() @Inject(NG_VALIDATORS) private validators,
        @Optional() @Inject(NG_ASYNC_VALIDATORS) private asyncValidators
    ) {

        this._observer = new MutationObserver(
            list => {

                for (const record of list) {

                    this.disabled = record?.target['disabled'] || this.el.nativeElement.hasAttribute(InputDirective.APP_INPUT.readonly);

                    if (this.disabled) {
                        this.setDisabledState();
                    } else {
                        this.setEnabledState();
                    }

                }

            }
        );

        this._observer.observe(
            this.el.nativeElement,
            {
                attributeFilter: ['disabled'],
                childList: false,
                subtree: false,
            }
        );

    }

    ngAfterViewInit(): void {

        if (
            this.el.nativeElement.classList.contains(InputDirective.APP_INPUT.type)
            || this.el.nativeElement.getAttribute('type') === 'hidden'
            || this.el.nativeElement.hasAttribute('hidden')
        ) {
            this.disabled = true;
            return;
        }

        this.checkValidators();

        if (this.el.nativeElement.type === "textarea") {
            this.hasIcon = false;
        }

        if (this.inputGroupDiv && this.hasIcon) {
            this.createIcon(this.inputGroupDiv);
        }

    }

    ngOnDestroy(): void {

        this.inputGroupDiv?.remove();
        this._observer.disconnect();
    }

    createIcon(div: HTMLElement): void {

        if (!this.hasValidators) {
            this.render.addClass(this.el.nativeElement, InputDirective.APP_INPUT.vo_no_icon);
            return;
        }

        const icon = this.render.createElement("i");
        this.render.addClass(icon, InputDirective.APP_INPUT.icon);
        this.render.addClass(icon, AppConfig.ICON_FAMILY_DEFAULT);
        div.appendChild(icon);

        this.myIcon = icon;
    }

    createDiv(): HTMLElement {

        const div = this.render.createElement("div");
        this.render.addClass(div, InputDirective.APP_INPUT.div);
        this.render.insertBefore(this.el.nativeElement.parentNode, div, this.el.nativeElement);
        this.render.appendChild(div, this.el.nativeElement);
        return div;
    }

    removeFocus() {

        if (this.hasIcon) {
            this.addIcon();
        }

        this.render.removeClass(
            this.el.nativeElement.parentElement,
            InputDirective.APP_INPUT.vo_valid
        );
        this.render.removeClass(
            this.el.nativeElement.parentElement,
            InputDirective.APP_INPUT.vo_invalid
        );
    }

    addIcon() {

        if (this.hasIcon && this.myIcon) {

            if (this.el?.nativeElement?.classList.contains(AppConfig.CSS_NG_VALID)) {

                this.removeIconError();

                if (this.formControl?.value) {
                    this.myIcon.classList.add(AppConfig.ICON_SUCCESS);
                } else {
                    this.removeIconSuccess();
                }

            } else if (this.el?.nativeElement?.classList.contains(AppConfig.CSS_NG_INVALID)) {

                this.removeIconSuccess();
                this.myIcon.classList.add(AppConfig.ICON_ERROR);

            }
        }

    }

    addFocus() {

        if (this.hasIcon) {
            this.addIcon();
        }

        if (this.el?.nativeElement?.classList.contains(AppConfig.CSS_NG_VALID)) {
            this.render.removeClass(
                this.el.nativeElement.parentElement,
                InputDirective.APP_INPUT.vo_invalid
            );
            this.render.addClass(
                this.el.nativeElement.parentElement,
                InputDirective.APP_INPUT.vo_valid
            );
        } else if (this.el?.nativeElement?.classList.contains(AppConfig.CSS_NG_INVALID)) {
            this.render.removeClass(
                this.el.nativeElement.parentElement,
                InputDirective.APP_INPUT.vo_valid
            );
            this.render.addClass(
                this.el.nativeElement.parentElement,
                InputDirective.APP_INPUT.vo_invalid
            );
        }
    }

    private shouldShowIcon() {
        return this.hasIcon && this.el?.nativeElement?.classList.contains(AppConfig.CSS_NG_TOUCHED);
    }

    private checkValidators() {

        try {
            const ngControl = this.injector.get(NgControl);

            if (!ngControl) {
                return;
            }

            if (ngControl instanceof FormControlName) {
                this.formControl = this.injector.get(FormGroupDirective).getControl(ngControl);
            } else if (ngControl instanceof FormControlDirective) {
                this.formControl = (ngControl as FormControlDirective)?.form as FormControl;
            } else {
                this.formControl = ngControl.control as FormControl;
            }

            if (this.formControl) {
                const hasValidators = !!this.formControl.validator;
                const hasAsyncValidators = !!this.formControl.asyncValidator;
                this.hasValidators = hasValidators || hasAsyncValidators;
            }
        } catch (error) {

        }

        if (!this.hasValidators) {
            this.hasValidators = !!this.validators || !!this.asyncValidators;
        }

    }

    private removeIconSuccess() {
        this.myIcon?.classList.remove(AppConfig.ICON_SUCCESS);
    }

    private removeIconError() {
        this.myIcon?.classList.remove(AppConfig.ICON_ERROR);
    }

    private setDisabledState() {
        this.disabled = true;
        this.render.addClass(this.el.nativeElement.parentElement, InputDirective.APP_INPUT.disabled);
        this.removeIconSuccess();
        this.removeIconError();
    }

    private setEnabledState() {
        this.disabled = false;
        this.render.removeClass(this.el.nativeElement.parentElement, InputDirective.APP_INPUT.disabled);

        if (this.shouldShowIcon()) {
            this.addIcon();
        }
    }

}
