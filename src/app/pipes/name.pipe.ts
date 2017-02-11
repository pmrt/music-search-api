import {Pipe} from '@angular/core';

@Pipe({
  name: 'name'
})

export class NamePipe {
  transform( arr ) {
    return arr.sort( (a, b) => {
      let nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
      if ( nameA > nameB ) {
        return 1;
      }
      if ( nameA < nameB ) {
        return -1;
      }
      return 0;
    });
  }
}
