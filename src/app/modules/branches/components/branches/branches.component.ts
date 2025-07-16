import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
declare const ymaps: any;

@Component({
  selector: 'app-branches',
  imports: [TranslateModule,CommonModule],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.scss'
})
export class BranchesComponent implements OnInit{
  branches = [
    {
      name: 'ELEVEN. ООО "GOLD ECO WATER"',
      address: 'Jizzakh, Jizzakh Region, Uzbekistan',
      coords: [40.158551, 67.7823631],
    },
    {
      name: 'Eleven Water – Yunusobod',
      address: 'Yunusobod , Toshkent',
      coords: [41.330707, 69.268620],
    }
  ];
  map: any;
  placemarks: any[] = [];

  ngOnInit(): void {
    if ((window as any).ymaps) {
      (window as any).ymaps.ready(() => {
        this.initMap();
      });
    } else {
      console.error('Yandex Maps script not loaded!');
    }
  }

  initMap() {
    this.map = new ymaps.Map('yandex-map', {
      center: [41.311081, 69.240562],
      zoom: 11,
      controls: ['zoomControl'],
    });

    this.loadMarkers();
  }

  loadMarkers() {
    this.branches.forEach(branch => {
      const placemark = new ymaps.Placemark(branch.coords, {
        balloonContentHeader: branch.name,
        balloonContentBody: branch.address
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'assets/images/icon/pin_7695812.png', // <– Suv belgisi rasmi
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -40] // markazlashtirish
      });

      this.map.geoObjects.add(placemark);
      this.placemarks.push(placemark);
    });
  }

  focusOn(branch: any) {
    this.map.setCenter(branch.coords, 14, { duration: 500 });
  }
}
