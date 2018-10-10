// main.js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import AppleLottery from './src/AppleLottery';
import './src/index.css';
import './dev.css';

declare const module: any;

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

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept();
}
