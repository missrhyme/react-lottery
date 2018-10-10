import * as React from 'react';
import {Component} from 'react';
import * as cx from 'classnames';
import getCoordinate from './utils';
import {IAward, TLotteryState} from './types';
import {isFunction, assign} from 'lodash';
import buttonB64 from './button';

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

  // styles
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

// 苹果机抽奖组件
export default class AppleLottery extends Component<IPropType, IStateType> {
  public static defaultProps = {
    list: [],
    rowCount: 3,
    initialSpeed: 100,
    slowAcceleration: 20,
    stopAcceleration: 40,
    validate: (next) => next(true),
    onLotteryComplete: () => { window.console.log('complete'); },
    onLotteryStart: () => { window.console.log('start'); },

    btnIamge: buttonB64,
    prefixClass: 'react-lottery',
    style: {},
    btnStyle: {},
    itemStyle: {},
    itemNameStyle: {}
  };

  public state = {
    currentIndex: 0
  };

  public speed = this.props.initialSpeed;
  public type: TLotteryState = 'wait';
  public raf = null;
  public lastTime = null;
  public awardIndex = null;

  public margin: number;
  public unit: number;

  constructor(props: IPropType) {
    super(props);
    const {rowCount} = props;
    this.margin = Math.floor(10 / rowCount);
    this.unit = Number(((100 - (rowCount - 1) * this.margin) / rowCount).toFixed(1));
  }

  public handleStart = () => {
    if (this.type !== 'wait') {
      return;
    }
    const {initialSpeed, validate, onLotteryStart} = this.props;
    validate((verify) => {
      if (verify) {
        this.speed = initialSpeed;
        this.type = 'infinity';
        onLotteryStart(this.handleStop, this.type);
        requestAnimationFrame(this.handleChange);
      }
    });
  }

  public handleStop = (index: number) => {
    this.type = 'slow';
    this.awardIndex = index;
    const second = (this.props.rowCount + Math.random() - 0.5) * 1000;
    setTimeout(() => this.type = 'stop', second);
  }

  public handleComplete = (index: number) => {
    const {onLotteryComplete, list} = this.props;
    onLotteryComplete(index, list[index]);
  }

  public handleChange = () => {
    const {list, slowAcceleration, stopAcceleration} = this.props;
    const {currentIndex} = this.state;
    const len = list.length;
    if (!this.lastTime || Date.now() - this.lastTime >= this.speed) {
      if (this.type === 'stop' && this.awardIndex === currentIndex) {
        this.handleComplete(this.awardIndex);
        this.type = 'wait';
        return;
      }
      const typeToAdd = {
        infinity: 0,
        slow: slowAcceleration,
        stop: stopAcceleration
      };
      this.speed += typeToAdd[this.type] || 0;
      this.lastTime = Date.now();
      const index = currentIndex === len - 1 ? 0 : currentIndex + 1;
      this.setState({
        currentIndex: index
      });
    }
    requestAnimationFrame(this.handleChange);
  }

  public render() {
    const {
      list, rowCount, style, btnStyle, btnIamge, prefixClass,
      buttonRenderer
    } = this.props;
    const assignedBtnStyle = assign(
      {},
      isFunction(btnStyle) ? btnStyle() : btnStyle,
      {
        width: `${this.unit}%`,
        height: `${this.unit}%`
      }
    );
    const computedStyle = isFunction(style) ? style() : style;
    return (
      <div className={`${prefixClass}-apple`} style={computedStyle}>
        <div
          className={`${prefixClass}-apple-slotbtn`}
          style={assignedBtnStyle}
          onClick={this.handleStart}
        >
          {buttonRenderer ? buttonRenderer() : <img src={btnIamge} alt='lottery-button' />}
        </div>
        {rowCount > 0 && list.map(this.renderItem)}
      </div>
    );
  }

  public renderItem = (item: IAward, index: number) => {
    const {
      rowCount, itemStyle, itemImageStyle, itemNameStyle, itemRenderer,
      prefixClass
    } = this.props;
    const cls = cx(`${prefixClass}-apple-item`, {
      [`${prefixClass}-apple-item-active`]: index === this.state.currentIndex && this.type !== 'wait'
    });
    const coordinate = getCoordinate(rowCount)[index];
    const margin = this.margin;
    const unit = this.unit;
    const style = assign(
      {},
      {
        width: `${unit}%`,
        height: `${unit}%`,
        left: `${coordinate.x * (unit + margin)}%`,
        top: `${coordinate.y * (unit + margin)}%`
      },
      isFunction(itemStyle) ? itemStyle(item, index, index === this.state.currentIndex) : itemStyle
    );
    const innerStyle = assign(
      {},
      item.img ? {
        backgroundImage: `url(${item.img})`
      } : {},
      isFunction(itemImageStyle) ? itemImageStyle(item, index, index === this.state.currentIndex) : itemImageStyle
    );
    const computedNameStyle = isFunction(itemNameStyle) ? itemNameStyle(item, index, index === this.state.currentIndex) : itemNameStyle;
    if (itemRenderer) {
      return itemRenderer(item, computedNameStyle);
    }
    return (
      <div
        className={cls}
        style={style}
        key={`${item.name}-${index}`}
      >
        <div className={`${prefixClass}-apple-item-image`} style={innerStyle} />
        <p style={computedNameStyle}>{item.name}</p>
      </div>
    );
  }
}
