import { Component, Input, OnInit } from '@angular/core';
import { DefiDto } from 'src/app/api/models';
@Component({
  selector: 'app-slides-defis',
  templateUrl: './slides-defis.component.html',
  styleUrls: ['./slides-defis.component.scss']
})
export class SlidesDefisComponent implements OnInit {
  @Input() defis!: DefiDto[];
  constructor() { }

  ngOnInit(): void {
  }

}
