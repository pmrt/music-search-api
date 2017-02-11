import { Injectable } from '@angular/core';
import { PopularityPipe } from '../pipes/popularity.pipe';
import { NamePipe } from '../pipes/name.pipe';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FilterService {

  private pipe: Subject<any> = new Subject<any>();
  constructor() {}

  setFilter( filter ) {
    switch ( filter ) {
      case 'popularity':
        this.pipe.next(PopularityPipe);
        break;
      case 'name':
        this.pipe.next(NamePipe);
        break;
      default:
        this.pipe.next('default');
    }
  }

  getFilter() {
    return this.pipe.asObservable();
  }
}
