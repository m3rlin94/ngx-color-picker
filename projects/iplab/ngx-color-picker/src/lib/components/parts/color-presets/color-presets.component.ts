import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Color } from './../../../helpers/color.class';

@Component({
    selector: `color-presets-component`,
    templateUrl: `./color-presets.component.html`,
    styleUrls: [
        `./../base.style.scss`,
        `./color-presets.component.scss`
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPresetsComponent {

    @Input()
    public columns: number = 8;

    @Input()
    public colorPresets: Array<Array<Color> | Color>;

    @Input()
    public color: Color;

    @Output()
    public colorChange = new EventEmitter<Color>(false);

    @Input()
    public direction: 'down' | 'up' | 'left' | 'right' = 'up';

    public onSelectionChange(color: Color): void {
        const selectedRgbaColor = color.getRgba();

        const newColor = new Color()
            .setRgba(selectedRgbaColor.red, selectedRgbaColor.green, selectedRgbaColor.blue, selectedRgbaColor.alpha);
        this.colorChange.emit(newColor);
    }

    public isList(colorPreset: Array<Array<Color> | Color>): boolean {
        return Array.isArray(colorPreset);
    }
}