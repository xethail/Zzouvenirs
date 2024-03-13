import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chip'
})
export class ChipPipe implements PipeTransform {

  transform(price: number): string {
    let color: string;
    if (0 <= price && price < 10) {color = 'green darken-1';}
    else if (10 <= price && price < 20) {color = 'green lighten-3';}
    else if (20 <= price && price < 50) {color = 'yellow darken-1';}
    else if (50 <= price && price < 100) {color = 'amber darken-3';}
    else if (100 <= price) {color = 'red darken-4';}
    else {color = 'gray';}
   
    return 'chip ' + color;
  }

}
