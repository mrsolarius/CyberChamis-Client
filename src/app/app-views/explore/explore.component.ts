import {Component, OnInit} from '@angular/core';
import {DefiDto} from "../../api/models/defi-dto";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  defis: DefiDto[] = [{
    titre: 'Titre du défi',
    description: 'Description du défi lalala',
    auteur: {
      username: 'clement',
      age: 25,
    }
  },
    {
      titre: 'Titre du défi 1',
      description: 'Description du défi lalala',
      auteur: {
        username: 'quentin',
        age: 25,
      }
    },
    {
      titre: 'Titre du défi 2',
      description: 'Description du défi lalala',
      auteur: {
        username: 'paul',
        age: 25,
      }
    },
    {
      titre: 'Titre du défi 3',
      description: 'Description du défi lalala',
      auteur: {
        username: 'jean',
        age: 25,
      }
    }];

  defiFound : DefiDto|null = null;
  constructor() {
  }

  ngOnInit(): void {
  }

  functionHandle(defi : DefiDto){
    console.log(defi);
    this.defiFound=defi;
  }

}
