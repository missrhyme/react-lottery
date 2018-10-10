export interface IAward {
  name: string;
  img: string;
  [key: string]: any;
}

export type TLotteryState = 'wait' | 'infinity' | 'stop' | 'slow';
