import * as React from 'react';
import { Component } from 'react';
import { IAward, TLotteryState } from './types';
export interface IPropType {
    list?: IAward[];
    rowCount?: number;
    onLotteryComplete?: (index: number, item: IAward) => void;
    validate?: (next: (verify: boolean) => void) => void;
    onLotteryStart?: (stop: (index: number) => void, currentState: TLotteryState) => void;
    initialSpeed?: number;
    slowAcceleration?: number;
    stopAcceleration?: number;
    itemRenderer?: (item: IAward, computedStyle: React.CSSProperties) => React.ReactNode;
    buttonRenderer?: () => React.ReactNode;
    btnIamge?: string;
    prefixClass?: string;
    style?: React.CSSProperties | Function;
    btnStyle?: React.CSSProperties | Function;
    itemStyle?: React.CSSProperties | Function;
    itemImageStyle?: React.CSSProperties | Function;
    itemNameStyle?: React.CSSProperties | Function;
}
export interface IStateType {
    currentIndex: number;
}
export default class AppleLottery extends Component<IPropType, IStateType> {
    static defaultProps: {
        list: any[];
        rowCount: number;
        initialSpeed: number;
        slowAcceleration: number;
        stopAcceleration: number;
        validate: (next: any) => any;
        onLotteryComplete: () => void;
        onLotteryStart: () => void;
        btnIamge: string;
        prefixClass: string;
        style: {};
        btnStyle: {};
        itemStyle: {};
        itemNameStyle: {};
    };
    state: {
        currentIndex: number;
    };
    speed: number;
    type: TLotteryState;
    raf: any;
    lastTime: any;
    awardIndex: any;
    margin: number;
    unit: number;
    constructor(props: IPropType);
    handleStart: () => void;
    handleStop: (index: number) => void;
    handleComplete: (index: number) => void;
    handleChange: () => void;
    render(): JSX.Element;
    renderItem: (item: IAward, index: number) => {};
}
