import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterModule,CommonModule,TranslateModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  dropdownOpen = false;
  constructor(private translateService: TranslateService) {
    const savedLang = localStorage.getItem('lang') || 'uz';
    this.selectedLang = savedLang;
    this.translateService.use(savedLang);
  }
  languages = [
    { code: 'uz', name: 'Uzbek', flag: 'assets/media/flags/uzbekistan.svg' },
    { code: 'ru', name: 'Russian', flag: 'assets/media/flags/russia.svg' },
    { code: 'en', name: 'English', flag: 'assets/media/flags/united-kingdom.svg' }
  ];

  selectedLang = 'uz';

  get selectedFlag(): string {
    return this.languages.find(lang => lang.code === this.selectedLang)?.flag ?? '';
  }

  getLangName(code: string): string {
    return this.languages.find(lang => lang.code === code)?.name ?? '';
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectLanguage(lang: any): void {
    this.selectedLang = lang.code;
    this.dropdownOpen = false;
    localStorage.setItem('lang', lang.code);
    // i18n yoki ngx-translate tilni almashtirish joyi shu yerda
    this.translateService.use(lang.code); // Agar ngx-translate ishlatilsa

  }

  // Tashqariga bosilganda dropdown yopilsin
  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: HTMLElement): void {
    const insideDropdown = target.closest('.language-dropdown');
    if (!insideDropdown) {
      this.dropdownOpen = false;
    }
  }
}
