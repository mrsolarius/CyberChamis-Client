import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreateIndiceService, IndiceForm} from "../create-indice.service";

@Component({
  selector: 'app-create-indice',
  templateUrl: './create-indice.component.html',
  styleUrls: ['../create.component.scss']
})
export class CreateIndiceComponent implements OnInit {
  indiceGroupe: FormGroup;
  @Input('indice') indice!: IndiceForm

  constructor(private formBuilder: FormBuilder, private createIndiceService : CreateIndiceService) {
    this.indiceGroupe = this.formBuilder.group({
      indice: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(1024)]],
      pointsPerdus: ['0', [Validators.required, Validators.min(0),Validators.max(5)]],
    });
  }

  ngOnInit(): void {
    if(this.indice){
      this.indiceGroupe.controls['indice'].setValue(this.indice.indice);
      this.indiceGroupe.controls['pointsPerdus'].setValue(this.indice.pointsPerdus);
    }
    this.indiceGroupe.valueChanges.subscribe(value => {
      this.updateIndice();
      console.log(value);
      this.createIndiceService.edit(this.indice.numero, this.indice);
    })
  }

  checkError(control: string, error: string) {
    return this.indiceGroupe.controls[control].hasError(error);
  }

  private updateIndice() {
    this.indice.indice = this.indiceGroupe.controls['indice'].value;
    this.indice.pointsPerdus = this.indiceGroupe.controls['pointsPerdus'].value;
    this.indice.isValide = this.indiceGroupe.valid;
  }
}
