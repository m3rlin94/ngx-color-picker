import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ColorPickerModule } from '@m3rlin94/ngx-color-picker';
import { ChromeWrapperComponent } from './chrome-picker/chrome-wrapper.component';



@NgModule({
  declarations: [
    ChromeWrapperComponent
  ],
  imports: [
    BrowserModule,
    ColorPickerModule
  ],
  exports: [
    ChromeWrapperComponent
  ]
})
export class WrapperExampleModule { }
