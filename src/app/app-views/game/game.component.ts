import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  iter: Array<number> = new Array<number>(200);

  constructor() { }

  ngOnInit(): void {
  }

}
