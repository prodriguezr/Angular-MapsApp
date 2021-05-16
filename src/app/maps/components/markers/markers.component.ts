import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface CustomMarker {
  color: string;
  marker?: mapboxgl.Marker | undefined ;
  center?: [ number, number ] | undefined ;
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
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
export class MarkersComponent implements AfterViewInit {
  map!:mapboxgl.Map;
  private _customMarkers:CustomMarker[] = [];

  zoomLevel: number = 15;
  centerCoords:[ number, number ] = [ -70.635430, -33.393246 ];

  @ViewChild('map') divMap!:ElementRef;

  constructor() { }

  get CustomMarkers():CustomMarker[] {
    return [...this._customMarkers];
  } 

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: this.zoomLevel,
      center: this.centerCoords
    });

    this.readMarkers();

    this.map.on('move', (event) => {
      const { lng, lat } = event.target.getCenter();
      this.centerCoords = [ lng, lat ];
    });
  }

  addMarker() { 
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const marker = new mapboxgl.Marker({ draggable: true, color })
      .setLngLat(this.centerCoords)
      .addTo(this.map);

    this._customMarkers.push(
      { marker, color }
    );

    marker.on('dragend', () => {
      this.saveMarkers();
    });

    this.saveMarkers();
  }

  gotoMarker(marker:mapboxgl.Marker) {
    this.map.flyTo({ center: marker.getLngLat() });
  }

  saveMarkers() {
    const arrMarkers:CustomMarker[] = [];

    this._customMarkers.forEach(m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      arrMarkers.push({ color, center: [ lng, lat ] })
    });

    localStorage.setItem('markers', JSON.stringify(arrMarkers));
  }

  readMarkers() {
    if (!localStorage.getItem('markers')) {
      return;
    }

    const arrMarkers:CustomMarker[] = JSON.parse(localStorage.getItem('markers')!);
  
    arrMarkers.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      })
        .setLngLat(m.center!)
        .addTo(this.map);

      this._customMarkers.push({
        marker: newMarker,
        color: m.color,
      });
   
      newMarker.on('dragend', () => {
        this.saveMarkers();
      });
    });
  }

  removeMarker(index:number) {
    this._customMarkers[index].marker?.remove();
    this._customMarkers.splice(index, 1);
    this.saveMarkers();
  }
}
