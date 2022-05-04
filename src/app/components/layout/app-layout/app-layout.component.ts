import {Component, HostListener, OnInit} from '@angular/core';
import {fadeAnimation} from "../../../animations/fadeAnimation";

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  animations:[fadeAnimation]
})
export class AppLayoutComponent implements OnInit {

  innerWidth: number = 1920;

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  constructor() { }
}
