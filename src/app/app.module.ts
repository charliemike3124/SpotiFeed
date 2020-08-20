import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import {DropdownModule} from 'primeng/dropdown'; 
import {MultiSelectModule} from 'primeng/multiselect';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BlockComponent } from './mainpage/block/block.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { FollowartistComponent } from './mainpage/followartist/followartist.component';
import {TooltipModule} from 'primeng/tooltip';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    BlockComponent,
    FollowartistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule,
    BrowserAnimationsModule,
    FormsModule,
    ProgressSpinnerModule,
    MultiSelectModule,
    TooltipModule,
    ToggleButtonModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
