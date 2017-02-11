import {Pipe} from '@angular/core';

// Decides which pipe should use

@Pipe({
  name: 'meta'
})

export class MetaPipe {
  transform( value, pipe ) {
    return new pipe().transform( value );
  }
}
