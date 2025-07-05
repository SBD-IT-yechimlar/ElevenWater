import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  goBack() {
    window.history.back();
  }

  goHome() {
    window.location.href = '/';
  }
}
