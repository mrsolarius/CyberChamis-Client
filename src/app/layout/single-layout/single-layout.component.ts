import {Component, HostListener, OnInit} from '@angular/core';
import {fadeAnimation} from "../../animations/fadeAnimation";

@Component({
  selector: 'app-single-layout',
  templateUrl: './single-layout.component.html',
  styleUrls: ['./single-layout.component.scss'],
  animations:[fadeAnimation]
})
export class SingleLayoutComponent implements OnInit {
  innerWidth: number = 1920;
  params: string = ''
  constructor() {
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

}
