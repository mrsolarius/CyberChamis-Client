import {Component, Input, OnInit} from '@angular/core';
import {DefiDto} from "../../../apis/api-local/models/defi-dto";

@Component({
  selector: 'app-defis',
  templateUrl: './defis.component.html',
  styleUrls: ['./defis.component.scss']
})
export class DefisComponent implements OnInit {
  @Input() defis!: DefiDto[];

  constructor() { }

  ngOnInit(): void {
  }

}
