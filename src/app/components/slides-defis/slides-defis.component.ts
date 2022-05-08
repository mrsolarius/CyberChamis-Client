import { Component, Input, OnInit } from '@angular/core';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { DefiDto } from 'src/app/api/models';
import { Defi } from 'src/app/api/models/defi';
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
