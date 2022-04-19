import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'environments/environment';

@Pipe({
    name: 'customdate',
})
export class CustomdatePipe implements PipeTransform {
    public dateFormate = environment.general_const.dateFormate;

    transform(value: any, args?: any): any {
        if (value !== undefined) {
            const newDate = new Date(value);
            if (typeof newDate !== 'undefined' && newDate !== undefined) {
                const estimateDate = newDate.toString().split(' ')[1];
                if (
                    value !== '' &&
                    newDate !== undefined &&
                    estimateDate === 'Date'
                ) {
                    value = value.toDate();
                } else {
                    value = newDate;
                }
            }
        } else {
            value = value;
        }
        const newConstDate = value;
        return newConstDate;
    }
}
