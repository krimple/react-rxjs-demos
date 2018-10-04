import React, { Component } from 'react';
import './App.css';
import { RxJSProvider } from './rxjs-demos/producer-consumer-example';
import RxEnabledComponent from './rxjs-demos/RxEnabledComponent';
import { interval, from } from 'rxjs';
import { flatMap } from 'rxjs/operators';

//const fetch$ = from(fetch('/farm-items.json', { headers: { 'Accept': 'application/json'}}))
//                    .pipe(flatMap(response => response.json()));

const fetch$ = interval(1000);

class App extends Component {
  render() {
    return (
      <RxJSProvider subject={fetch$}>
         <RxEnabledComponent />
      </RxJSProvider>
    );
  }
}

export default App;
