import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
    value: string;
    constructor(@Inject('myValue') value: number) {
        this.value = value.toString();
    }

    getHello(): string {
        return this.value;
    }
}
