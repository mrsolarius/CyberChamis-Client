import { Component, OnInit } from '@angular/core';
import {Defi} from "../../api/models/defi";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  defi: Defi = {
    titre:'Titre du défi',
    description:'Description du défi lalala',
    dateDeCreation:'2018-01-01',
    auteur:{
      login:'clement',
      age:25,
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
