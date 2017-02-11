import {Pipe} from '@angular/core';

// Returns the value as it is

@Pipe({
  name: 'default'
})


export class DefaultPipe {

  transform( value ) {
    return value;
  }
}
