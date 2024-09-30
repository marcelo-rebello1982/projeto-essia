import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

/**
 * Essa diretiva vai aceitar cor e tamanho de um botão e estilar a tag <button> referenciada.
 *
 * Para usar o padrão apenas inclua [appVoButtons] na sua tag button "<button [appButton]>"
 *
 * Para usar outro estilo:
 * <button [appButton] color="<cor>" size="<tamanho>">
 *
 * @param {string} color - A cor e estilo do botão.
 * @param {string} size - O tamanho do botão.
 */
@Directive({
    selector: '[appButton]',
})
export class ButtonDirective implements OnInit {

    static BUTTON_STYLE = {
        type: 'app-btn',
        color: {
            primary: 'app-btn-primary',
            default: 'app-btn-default',
            secondary: 'app-btn-secondary',
        },
        size: {
            sm: 'app-btn-sm',
            md: 'app-btn-md',
            lg: 'app-btn-lg',
        },
        block: 'app-btn-block',
    };

    private _init = false;
    private _color: 'primary' | 'secondary' | 'default' = 'default';
    private _oldStyle = undefined;

    // este input serve apenas para conseguir usar desta forma: [appButton] MP 23/06/2024
    @Input()
    appButton = '';

    @Input()
    set color(value: 'primary' | 'secondary' | 'default') {
        this._color = value;
        this.changeColor();
        this._oldStyle = this._color;
    }

    @Input() size: 'sm' | 'md' | 'lg' = 'md';
    @Input() block = false;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) { }

    ngOnInit(): void {

        this._init = true;
        this.changeColor();

        this.el.nativeElement.classList.add(ButtonDirective.BUTTON_STYLE.type);
        this.el.nativeElement.classList.add(ButtonDirective.BUTTON_STYLE.size[this.size]);

        if (this.block) {
            this.el.nativeElement.classList.add(ButtonDirective.BUTTON_STYLE.block);
        }

    }

    private changeColor() {

        if (!this._init) { return; }

        if (this._oldStyle) {
            this.renderer.removeClass(this.el.nativeElement, ButtonDirective.BUTTON_STYLE.color[this._oldStyle]);
        }

        this.el.nativeElement.classList.add(ButtonDirective.BUTTON_STYLE.color[this._color]);

    }

}
