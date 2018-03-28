import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seconds2hours'
})
export class Seconds2HoursPipe implements PipeTransform {

  transform(value: number): string {
    const hours: number = Math.floor(value / (60 * 60));
    const minutes: number = Math.floor(((value - (hours * 60 * 60)) / 60));
    return hours + ':' + minutes + ':' + Math.round(value - ((hours * 60 * 60) + (minutes * 60)));
  }
}

@Pipe({
  name: 'meters2kilometers'
})
export class Meter2KilometersPipe implements PipeTransform {

  transform(value: number): number {
    return roundTo(value / 1000,2);
  }
}

@Pipe({
  name: 'paceCalculator'
})
export class PaceCalculatorPipe implements PipeTransform {

  transform(value: number): number {
    return (1000/value);
  }
}


function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
        if( n < 0) {
        negative = true;
      n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);
    if( negative ) {    
        n = (n * -1).toFixed(2);
    }
    return n;
}