import React, { Fragment } from 'react';
import { RxJSProvider, RxJSConsumer } from './RxProviderConsumer';

//const fetch$ = from(fetch('/farm-items.json', { headers: { 'Accept': 'application/json'}}))
//                    .pipe(flatMap(response => response.json()));

import { interval, from } from 'rxjs';
import { flatMap } from 'rxjs/operators';

const fetch$ = interval(1000);

const RxHOCDemo = () => (
  <Fragment>
  <h2>RxJS HOC Demo</h2>
  <hr/>
  <p>This demo shows how to create a React Context to share data emitted by an observable anywhere in depth of the component tree.
  The sample emits the provider, <code>RxJSProvider</code>, which wraps the tree, and defines the subject to observe.
  The consumer, <code>RxJSConsumer</code>, wraps the content of the inner component (which we're using a render component
    to show).</p>
    <RxJSProvider subject={fetch$}>
        <RxJSConsumer>
        {
         (props) => {
          // this could be its own component, but we're using a renderprops embedded
          // in-line component as an example
          return (<div>
            Subscription active? { props.subscriptionActive ? 'YES': 'NO'}<br/>
            Subscription data: <br/>
            <pre>{ JSON.stringify(props)}</pre>
            <button onClick={() => { props.endSubscription(); }}>Terminate Observable!</button>
          </div>);
        }
      }
      </RxJSConsumer>
    </RxJSProvider>
    <p><em>The <code>Terminate Observable</code></em> button triggers the callback method embedded in the
    consumer from the provider. This callback method closes the observable by issuing a <code>complete</code>
    method, which then also causes the provider to update the subscriptionActive flag.</p>
    <p>The observable is canceled in 10 seconds. This could also be a parameter fed to the provider.</p>
    <p>Finally, an alternative one-shot observable is commented out that uses Fetch + data from Ajax
    as a an alternative. You'd have to change the code in the consumer to try it out.</p>
    </Fragment>
);


export default RxHOCDemo;
