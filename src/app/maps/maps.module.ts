import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { FullScreenComponent } from './components/full-screen/full-screen.component';
import { ZoomRangeComponent } from './components/zoom-range/zoom-range.component';
import { MarkersComponent } from './components/markers/markers.component';
import { EstatesComponent } from './components/estates/estates.component';
import { MiniMapComponent } from './components/mini-map/mini-map.component';


@NgModule({
  declarations: [
    FullScreenComponent,
    ZoomRangeComponent,
    MarkersComponent,
    EstatesComponent,
    MiniMapComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
