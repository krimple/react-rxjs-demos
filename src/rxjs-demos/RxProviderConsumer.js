import React, { Component } from 'react';

const SharedRxJSContext = React.createContext();

export class RxJSProvider extends Component {

  constructor(props: any) {
    super(props);
    this.state = {
      subscriptionActive: false,
      rxjsValue: null
    };
  }

  componentDidMount = () => {
    const endSubscription = this.endSubscription;
    this.subscription = this.props.subject.subscribe(
      (nextVal) => this.setState({ rxjsValue: nextVal, subscriptionActive: true })
    );
    setTimeout(() => {
      endSubscription();
    }, 10000);
  }

  render() {
    const endSubscription = this.endSubscription;
    return (
      <SharedRxJSContext.Provider value={{ ...this.state, endSubscription: this.endSubscription }}>
         { this.props.children }
      </SharedRxJSContext.Provider>
    );
  }

  endSubscription = () => {
    const subscription = this.subscription;
    if (subscription) {
      subscription.complete();
    }
    this.setState({ subscriptionActive: false });
  }
}

export class RxJSConsumer extends React.Component {
  render() {
    return <SharedRxJSContext.Consumer>
    { this.props.children }
    </SharedRxJSContext.Consumer>;
  }
}
