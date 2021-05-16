import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullScreenComponent } from './components/full-screen/full-screen.component';
import { ZoomRangeComponent } from './components/zoom-range/zoom-range.component';
import { MarkersComponent } from './components/markers/markers.component';
import { EstatesComponent } from './components/estates/estates.component';
import { MiniMapComponent } from './components/mini-map/mini-map.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'fullscreen', component: FullScreenComponent },
      { path: 'zoom-range', component: ZoomRangeComponent },
      { path: 'markers', component: MarkersComponent },
      { path: 'estates', component: EstatesComponent },
      { path: '**', redirectTo: 'fullscreen' },    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
