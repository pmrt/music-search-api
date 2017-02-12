import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BreadcrumbService {

  private levels: string[];
  private subject: Subject<string[]> = new Subject<string[]>();
  constructor() {
    this.levels = [];
  }

  getLevels(): Observable<any> {
    return this.subject.asObservable();
  }

  setLevel( lvl, str: string ): void {
    this.levels.splice( --lvl, 1, str);
    this.subject.next( this.levels );
  }

}
