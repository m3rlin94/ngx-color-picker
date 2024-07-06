import { BaseColor } from './base-color.class';

/**
 * RGB (Red Green Blue)
 *
 * Red = ranges from 0-255
 * Green = ranges from 0-255
 * Blue = ranges from 0-255
 * Alpha = range from 0-1
 */
export class Rgba extends BaseColor {

    constructor(public red: number, public green: number, public blue: number, public alpha: number) {
        super();
    }

    public toString(showAlphaChannel: boolean = true): string {
        return showAlphaChannel
            ? `rgba(${this.getRed()}, ${this.getGreen()}, ${this.getBlue()}, ${this.getAlpha()})`
            : `rgb(${this.getRed()}, ${this.getGreen()}, ${this.getBlue()})`;
    }

    public getRed(): number {
        return Math.round(this.red);
    }

    public getGreen(): number {
        return Math.round(this.green);
    }

    public getBlue(): number {
        return Math.round(this.blue);
    }

    public getAlpha(): number {
        return Math.round(this.alpha * 100) / 100;
    }

    public equal(color: Rgba): boolean {
        if (this === color) {
            return true;
        }
        return this.red === color.red
            && this.green === color.green
            && this.blue === color.blue
            && this.alpha === color.alpha;
    }
}
