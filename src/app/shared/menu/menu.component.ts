import { Component } from '@angular/core';

interface MenuItem {
  name:string;
  path:string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  `
  li {
    cursor: pointer;
  }
  `
  ]
})
export class MenuComponent {
  private _menuItems:MenuItem[] = [
    { name: 'Fullscreen', path: '/maps/fullscreen' },
    { name: 'Zoom Range', path: '/maps/zoom-range' },
    { name: 'Markers', path:'/maps/markers' },
    { name: 'Estates', path: '/maps/estates' },
  ];

  constructor() { }

  get MenuItems():MenuItem[] {
    return [...this._menuItems];
  }
}
