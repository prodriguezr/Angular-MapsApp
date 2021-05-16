import { Component, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styles: [
  `
  div {
    width: 100%;
    height: 150px;
    margin: 0;
  }
  `
  ]
})
export class MiniMapComponent implements AfterViewInit {
  @Input() lnglat: [number, number] = [ 0, 0 ];
  @ViewChild('map') divMap!:ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 15,
      center: this.lnglat,
      interactive: false,
    });
    
    new mapboxgl.Marker()
      .setLngLat(this.lnglat)
      .addTo(map)
  }

}
