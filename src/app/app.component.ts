import {Component} from '@angular/core';
import {leftRightAnimation} from "./animations/leftRightAnimation";
import {LeftRightAnimationStateService} from "./services/left-right-animation-state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[leftRightAnimation]
})
export class AppComponent{

  constructor(public state: LeftRightAnimationStateService) {
  }

}
