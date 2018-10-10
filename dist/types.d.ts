export interface IAward {
    name: string;
    img: string;
    [key: string]: any;
}
export declare type TLotteryState = 'wait' | 'infinity' | 'stop' | 'slow';
