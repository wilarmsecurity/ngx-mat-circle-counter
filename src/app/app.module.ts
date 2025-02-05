import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatGridListModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule } from '@angular/material';
import { NgxMatCircleCounterModule } from '../../projects/ngx-mat-circle-counter/src/lib/ngx-mat-circle-counter.module';

import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatGridListModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule,
    NgxMatCircleCounterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
