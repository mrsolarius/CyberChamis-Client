import {Component, Input, OnInit} from '@angular/core';
import {Defi} from "../../api/models/defi";

@Component({
  selector: 'app-defis',
  templateUrl: './defis.component.html',
  styleUrls: ['./defis.component.scss']
})
export class DefisComponent implements OnInit {
  @Input() defis!: Defi[];

  constructor() { }

  ngOnInit(): void {
  }

}
