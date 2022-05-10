import {Component, HostListener, OnInit} from '@angular/core';
import {fadeAnimation} from "../../../animations/fadeAnimation";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-single-layout',
  templateUrl: './single-layout.component.html',
  styleUrls: ['./single-layout.component.scss'],
  animations:[fadeAnimation]
})
export class SingleLayoutComponent implements OnInit {
  innerWidth: number = 1920;
  params: string = ''
  constructor(private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

}
