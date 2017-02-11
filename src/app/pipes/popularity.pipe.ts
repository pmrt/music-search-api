import {Pipe} from '@angular/core';

@Pipe({
  name: 'popularity'
})

export class PopularityPipe {
  transform( arr ) {
    return arr.sort( (a, b) => {
      if ( a.popularity < b.popularity ) {
        return 1;
      }
      if ( a.popularity > b.popularity ) {
        return -1;
      }
      return 0;
    });
  }
}
