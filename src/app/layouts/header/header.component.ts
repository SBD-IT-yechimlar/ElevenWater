import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ShopService } from '../../core/auth/services/shop.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterModule, CommonModule, TranslateModule],
  standalone: true,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, AfterViewInit {
  dropdownOpen = false;
  isMobile = false;
  cartItemCount = 0;

  constructor(
    private translateService: TranslateService,
    private shopService: ShopService
  ) {
    const savedLang = localStorage.getItem('lang') || 'uz';
    this.selectedLang = savedLang;
    this.translateService.use(savedLang);
  }
  ngOnInit(): void {
    this.shopService.cartItems$.subscribe((items) => {
      this.cartItemCount = items.length;
    });
  }
  languages = [
    { code: 'uz', name: 'Uzbek', flag: 'assets/media/flags/uzbekistan.svg' },
    { code: 'ru', name: 'Russian', flag: 'assets/media/flags/russia.svg' },
    {
      code: 'en',
      name: 'English',
      flag: 'assets/media/flags/united-kingdom.svg',
    },
  ];

  selectedLang = 'uz';

  get selectedFlag(): string {
    return (
      this.languages.find((lang) => lang.code === this.selectedLang)?.flag ?? ''
    );
  }

  getLangName(code: string): string {
    return this.languages.find((lang) => lang.code === code)?.name ?? '';
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectLanguage(lang: any): void {
    this.selectedLang = lang.code;
    this.dropdownOpen = false;
    localStorage.setItem('lang', lang.code);
    this.translateService.use(lang.code);
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: HTMLElement): void {
    const insideDropdown = target.closest('.language-dropdown');
    if (!insideDropdown) {
      this.dropdownOpen = false;
    }
  }
  ngAfterViewInit(): void {
    this.checkScreenSize();

    const openBtn = document.querySelector('.mobile-nav-toggler');
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        document.body.classList.add('mobile-menu-visible');
      });
    }

    const closeBtn = document.querySelector('.mobile-menu .close-btn');
    const backdrop = document.querySelector('.mobile-menu .menu-backdrop');

    const closeMenu = () => {
      document.body.classList.remove('mobile-menu-visible');
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeMenu);
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();

    if (
      !this.isMobile &&
      document.body.classList.contains('mobile-menu-visible')
    ) {
      document.body.classList.remove('mobile-menu-visible');
    }
  }
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }
  openMenu: string | null = null;

  toggleMenu(menu: string): void {
    this.openMenu = this.openMenu === menu ? null : menu;
  }
}
