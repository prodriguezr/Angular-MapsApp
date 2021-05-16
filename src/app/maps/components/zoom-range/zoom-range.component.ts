import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
  `
  .map-container {
    width: 100%;
    height: 100%;
  }

  .list-group {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 999;
  }

  li {
    cursor: pointer;
  }
  `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  map!:mapboxgl.Map;
  zoomLevel: number = 9;
  centerCoords:[ number, number ] = [ -70.635430, -33.393246 ];

  @ViewChild('map') divMap!:ElementRef;

  constructor() { }

  ngOnDestroy(): void {
    this.map.off('zoom', () => {});
    this.map.off('zoomend', () => {});
    this.map.off('move', () => {});
  }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: this.zoomLevel,
      center: this.centerCoords
    });

    this.map.on('zoom', () => this.zoomLevel = this.map.getZoom());

    this.map.on('zoomend', () => {
      if (this.map.getZoom() > 18) {
        this.map.zoomTo(18);
      }
    });

    this.map.on('move', (event) => {
      const target = event.target;

      const { lng, lat } = target.getCenter();

      this.centerCoords = [ lng, lat ];
    });
  }

  zoomOut():void {
    this.map.zoomOut();
    //this.zoomLevel = this.map.getZoom();
  }

  zoomIn():void {
    this.map.zoomIn();
    //this.zoomLevel = this.map.getZoom();
  }

  zoomChanged(zoomValue:string) {
    this.map.zoomTo(Number(zoomValue));
  }
}
