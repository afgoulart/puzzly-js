import React from 'react';
import ReactWebComponent from 'react-web-component';
import MyApp from './App';

class App extends React.Component {
  render() {
    console.log('>>>>>>>>>>>>>>>>>.');
    return (
      <div>
        <h1> AAAAAAAAAAAAAAAAAA</h1>
        <MyApp />
      </div>
    );
  }
}

ReactWebComponent.create(<App />, 'react-pkg');
