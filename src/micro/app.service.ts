import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  calculateWordCount(str: string) {
    console.log('calculateWordCount');

    const words = str.trim().split(/\s+/);
    return words.reduce((a, c) => ((a[c] = (a[c] || 0) + 1), a), {});
  }
}