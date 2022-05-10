import { Component, OnInit } from '@angular/core';
import {DefiDto} from "../../api/models/defi-dto";
import {DefiRestControllerService} from "../../api/services/defi-rest-controller.service";
import {BehaviorSubject, Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {TagCount} from "../../api/models/tag-count";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  defi:BehaviorSubject<DefiDto[]> = new BehaviorSubject<DefiDto[]>([]);
    /*[
    {
      tag: "tag1",
      nbdefis: 10,
    },
    {
      tag: "tag2",
      nbdefis: 70,
    },
    {
      tag: "tag3",
      nbdefis: 16,
    }
  ];*/
  tagsObs : Observable<TagCount[]>;
  tagsTab? : TagCount[];

  constructor(private defisRest : DefiRestControllerService) {
    this.tagsObs = defisRest.getTagCount();
    this.tagsObs.subscribe((v)=>{this.tagsTab = v;});
  }

  ngOnInit(): void {
    this.defisRest.getDefis().pipe(filter(this.isNonNull)).subscribe((v)=>{
      this.defi.next(v);
    });
  }


  isNonNull<T>(value: T): value is NonNullable<T> {
    return value != null && typeof value !== "undefined";
  }

  get obs(){
    return this.defi.asObservable()
  }

}
