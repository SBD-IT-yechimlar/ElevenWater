import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule],
  template: `
    <style>
      app-layout {
        }
    </style>

<div class="boxed_wrapper ltr">

<!-- Preloader -->
<div class="loader-wrap">
    <div class="preloader"><div class="preloader-close">Preloader Close</div></div>
    <div class="layer layer-one"><span class="overlay"></span></div>
    <div class="layer layer-two"><span class="overlay"></span></div>
    <div class="layer layer-three"><span class="overlay"></span></div>
</div>

<!-- page-direction -->
<div class="page_direction">
    <div class="demo-rtl direction_switch"><button class="rtl">RTL</button></div>
    <div class="demo-ltr direction_switch"><button class="ltr">LTR</button></div>
</div>
<!-- page-direction end -->

    <ng-container>

      <div class="">

        <app-header></app-header>
        <main  >
          <router-outlet></router-outlet>
          </main>

          <app-footer></app-footer>
      </div>
    </ng-container>
  `,
})
export class LayoutComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    setTimeout(() => {
      const loader = document.querySelector('.loader-wrap') as HTMLElement;
      if (loader) {
        loader.style.display = 'none';
      }
    }, 1000);
  }
  // This component can be used for authentication purposes
  // It can include login, registration, and other auth-related functionalities
}
