import {moveItemInArray} from "@angular/cdk/drag-drop";
import {BehaviorSubject} from "rxjs";
let id = 0;

export interface AbstractForm{
  id: number;
  numero: number;
  isValide: boolean;
}

export abstract class FormCollection<T extends AbstractForm> {
  protected abstract defaultValue: T;
  private subj = new BehaviorSubject<T[]>([]);

  protected setDefaultValue(): void {
    this.subj.next([this.defaultValue]);
  }

  addNew() {
    id++;
    this.subj.next([...this.subj.value, {...(this.defaultValue), id, numero: this.subj.value.length}]);
  }

  remove(number: number) {
    this.subj.next([
      ...this.subj.value
        .filter((e) => number !== e.numero)
        .map((e, i) => ({...e, numero: i}))
    ]);
  }

  move(oldPos: number, newPos: number) {
    if ((oldPos < 0 || oldPos > this.subj.value.length) && (newPos < 0 || newPos < this.subj.value.length)) {
      console.error('move : invalid position');
      return;
    }
    let values = this.subj.value;
    moveItemInArray(values, oldPos, newPos);
    const newValues = values.map((e, i) => ({...e, numero: i}));
    this.subj.next(newValues);
  }

  edit(number: number, value: T) {
    const values = this.subj.value;
    values[number] = {...value, numero: number};
    this.subj.next(values);
  }

  get() {
    return this.subj.asObservable();
  }
}
