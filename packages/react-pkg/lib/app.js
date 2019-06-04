import React from 'react';
import ReactWebComponent from 'react-web-component';

class App extends React.Component {
  render() {
    return <div>Hello World!</div>;
  }
}

ReactWebComponent.create(<App />, 'react-pkg');