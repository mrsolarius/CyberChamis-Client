import {Component, HostListener, OnInit} from '@angular/core';
import {fadeAnimation} from "./animations/fadeAnimation";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[fadeAnimation]
})
export class AppComponent implements OnInit {
  title = 'escape-game-front';
  innerWidth: number = 1920;

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

}
