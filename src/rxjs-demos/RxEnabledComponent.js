import * as React from 'react';
import { SharedRxJSContext } from './producer-consumer-example';

export default class RxEnabledComponent extends React.Component {
  render() {
    return <SharedRxJSContext.Consumer>
    { (props) => {
      return <div>
        { props.subscriptionActive ? 'YES': 'NO'} -
      { JSON.stringify(props) + 'Y' }
      <button onClick={() => { props.endSubscription(); }}>DIE, DIE, DIE!</button>
      </div>;
    }}
    </SharedRxJSContext.Consumer>;
  }
}
