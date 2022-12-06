import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Renderer2,
    ElementRef,
    Output,
    EventEmitter,
    ViewChild,
    SimpleChanges,
    OnChanges
} from '@angular/core';
import { Color } from './../../../helpers/color.class';
import { BaseComponent } from './../base.component';

@Component({
    selector: `hue-component`,
    templateUrl: `./hue.component.html`,
    styleUrls: [
        `./../base.style.scss`,
        `./hue.component.scss`
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HueComponent extends BaseComponent implements OnChanges {

    @Input()
    public hue: Color;

    @Output()
    public hueChange = new EventEmitter<Color>(false);

    @Input()
    public color: Color;

    @Output()
    public colorChange = new EventEmitter<Color>(false);

    @ViewChild('pointer', { static: true })
    public pointer: ElementRef;

    private isVertical: boolean = false;

    pointerPosition: number;

    constructor(private readonly renderer: Renderer2) {
        super();
    }

    @Input()
    public set vertical(value: string) {
        this.isVertical = true;
    }

    /**
     * color can be changed through inputs
     * and then we need to move pointer
     */
    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hue && changes.hue.previousValue !== changes.hue.currentValue) {
            const hsva = this.hue.getHsva();
            this.changePointerPosition(hsva.hue);
        }
    }

    public movePointer({ x, y, height, width }): void {
        const hue = this.isVertical ? (y / height) * 360 : (x / width) * 360;
        this.changePointerPosition(hue);

        const color = this.color.getHsva();
        const newColor = new Color().setHsva(hue, color.saturation, color.value, color.alpha);
        const newHueColor = new Color().setHsva(hue, 100, 100, color.alpha);

        this.hueChange.emit(newHueColor);
        this.colorChange.emit(newColor);
    }

    /**
     * hue value is in range from 0 to 360°
     */
    private changePointerPosition(hue: number): void {
        const x = hue / 360 * 100;
        const orientation = this.isVertical ? 'top' : 'left';
        this.pointerPosition = x;
        this.renderer.setStyle(this.pointer.nativeElement, orientation, `${x}%`);
    }
}