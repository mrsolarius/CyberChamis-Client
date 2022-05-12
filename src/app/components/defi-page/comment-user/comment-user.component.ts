import {Component, Input, OnInit} from '@angular/core';
import {CommentaireDto} from "../../../apis/api-local/models/commentaire-dto";

@Component({
  selector: 'app-comment-user',
  templateUrl: './comment-user.component.html',
  styleUrls: ['./comment-user.component.scss']
})
export class CommentUserComponent implements OnInit {

  @Input() commentaire !: CommentaireDto;

  constructor() { }

  ngOnInit(): void {
  }

  getText() {
    if (this.commentaire)
      return this.commentaire.text;
    return "Commentaire inconnu"
  }
}
