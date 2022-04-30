import {Component, HostListener, OnInit} from '@angular/core';
import {fadeAnimation} from "../../../animations/fadeAnimation";

@Component({
  selector: 'app-game-layout',
  templateUrl: './game-layout.component.html',
  styleUrls: ['./game-layout.component.scss'],
  animations:[fadeAnimation]
})
export class GameLayoutComponent implements OnInit {
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
