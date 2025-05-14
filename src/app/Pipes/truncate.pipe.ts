import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'Truncate'
})

export class TruncatePipe implements PipeTransform {

    transform(value: string, limit: number): string {
        if(value || value.length <= limit){
            return value;
        }
        return value.slice(0, limit) + ' ...';
    }
}