import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { TransitProvider } from '../build/transit'

const App = () => {
  return (
    <TransitProvider appname="example">
      <div> EOS Hooks FTW!</div>
    </TransitProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));