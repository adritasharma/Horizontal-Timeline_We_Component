import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HorizontalTimelineComponent } from './horizontal-timeline/horizontal-timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    HorizontalTimelineComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
