import { AfterViewInit, Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [TranslateModule,CommonModule],
templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit {
  @Input() lat: number = 40.158551;
  @Input() lng: number = 67.7823631;
  @Input() zoom: number = 16;
  @Input() title: string = 'ELEVEN. ООО "GOLD ECO WATER"';
  @Input() email: string = 'info@elevenwater.uz';

  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=uz_UZ';
    script.type = 'text/javascript';
    script.onload = () => this.initMap();
    document.head.appendChild(script);
  }

  initMap() {
    // @ts-ignore
    ymaps.ready(() => {
      // @ts-ignore
      const map = new ymaps.Map('yandex-map', {
        center: [this.lat, this.lng],
        zoom: this.zoom,
      });

      // @ts-ignore
      const placemark = new ymaps.Placemark([this.lat, this.lng], {
        balloonContent: `${this.title}<br><a href="mailto:${this.email}">${this.email}</a>`,
      });

      map.geoObjects.add(placemark);
    });
  }
}
