import React from 'react';
import ReactWebComponent from 'react-web-component';
import MyApp from './App';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>React Component</h1>
        <MyApp />
      </div>
    );
  }
}

ReactWebComponent.create(<App />, 'react-pkg');
