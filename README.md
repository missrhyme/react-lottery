# React Lottery Component

### Demo
This is [an example](https://missrhyme.github.io/react-lottery/index.html).

### Example
```javascript
import AppleLottery from 'react-lottery';
import 'react-lottery/dist/index.css';

const list = [
  {name: 'thanks', img: ''},
  {name: 'thanks', img: ''},
  {name: 'thanks', img: ''},
  {name: 'thanks', img: ''},
  {name: 'thanks', img: ''},
  {name: 'thanks', img: ''},
  {name: 'Gift1', id: '1', img: '', color: '#ddd'},
  {name: 'thanks', img: ''}
];

let lotteryTimes = 5;

const App = () => (
  <React.Fragment>
    <h1>React Lottery Example</h1>
    <AppleLottery
      list={list}
      rowCount={3}
      style={{
        width: document.body.clientWidth < 600 ? '90vw' : '600px',
        height: document.body.clientWidth < 600 ? '90vw' : '600px'
      }}
      itemStyle={(item, index, isActive) => {
        return {
          background: item.color
        };
      }}
      validate={(next) => {
        if (lotteryTimes <= 0) {
          alert('No more lottery times! Now give you 5 times.');
          lotteryTimes = 5;
        } else {
          lotteryTimes -= 1;
          setTimeout(() => next(true), 50);
        }
      }}
      onLotteryStart={(complete, state) => {
        setTimeout(() => complete(5), 2000);
      }}
      onLotteryComplete={(index, item) => {
        window.console.log(index, item);
      }}
    />
  </React.Fragment>
);
```

### Params
```javascript
  // award list
  list?: IAward[];
  
  // row count
  rowCount?: number;

  // validation before start lottery
  validate?: (next: (verify: boolean) => void) => void;

  // trigger when lottery complete
  onLotteryComplete?: (index: number, item: IAward) => void;

  // trigger when lottery start, use functon `stop` to stop 
  onLotteryStart?: (stop: (index: number) => void, currentState: TLotteryState) => void;

  // function to render lottery item
  itemRenderer?: (item: IAward, computedStyle: React.CSSProperties) => React.ReactNode;

  // function to render lottery button
  buttonRenderer?: () => React.ReactNode;

  // initial speed, default is 100ms
  initialSpeed?: number;

  // slow speed, default is 20ms
  slowAcceleration?: number;

  // stop speed, default is 20ms
  stopAcceleration?: number;

  // lottery button image
  btnIamge?: string;

  prefixClass?: string;

  style?: React.CSSProperties | Function;

  btnStyle?: React.CSSProperties | Function;

  itemStyle?: React.CSSProperties | Function;

  itemImageStyle?: React.CSSProperties | Function;

  itemNameStyle?: React.CSSProperties | Function;
```