import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user/user.service";
import {CommentaireRestControllerService} from "../../api/services/commentaire-rest-controller.service";
import {firstValueFrom, lastValueFrom} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommentaireDto} from "../../api/models/commentaire-dto";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input('defiId') defiId!:string;
  @Output('commentAdded') commentAdded = new EventEmitter<CommentaireDto>();
  angForm: FormGroup = this.fb.group({
    comment:['',[Validators.maxLength(128),Validators.minLength(5),Validators.required]]
  });

  constructor(private fb: FormBuilder,
              public userService : UserService,
              private commentaireControler : CommentaireRestControllerService,
              private snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }

  async submitForm() {
    if (this.angForm.controls['comment'].value.length > 0) {
      const id = await firstValueFrom(this.userService.getUserId());
      if(id===-1){
        this.snackBar.open("Vous devez être connecté pour commenter", "Ok", {
          duration: 2000,
        });
        return;
      }
      const comment : CommentaireDto = {
        idDefi: this.defiId,
        idUtilisateur: id,
        text: this.angForm.controls['comment'].value
      };
      try {
        await lastValueFrom(this.commentaireControler.createOrUpdateCom({body:comment}));
        this.snackBar.open("Commentaire ajouté", "Ok", {
          duration: 2000,
        });
        this.commentAdded.emit(comment);
        this.angForm.reset();
      } catch (e) {
        this.snackBar.open("Erreur lors de l'ajout du commentaire", "Ok", {
          duration: 2000,
        });
      }
    }
  }
}
