import { Component, OnInit } from '@angular/core';
import { DefiDto } from 'src/app/api/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  defis: DefiDto[] = [{titre: "patate"},{titre: "gateau"}]
  constructor() { }

  ngOnInit(): void {
  }

}
