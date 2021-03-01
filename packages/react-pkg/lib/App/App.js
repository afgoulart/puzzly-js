import React, { Component } from 'react';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  setList(value) {
    this.setState({
      list: this.state.list.concat(value),
    });
  }

  removeItem(item) {
    const { list } = this.state;
    this.setState({
      list: list.reduce(
        (acc, i, idx) => (idx === item ? acc : acc.concat(i)),
        []
      ),
    });
  }

  render() {
    const { list } = this.state;
    return (
      <div>
        <h1>Todo's List</h1>
        <input
          placeholder="What will you do?"
          onKeyUp={(e) => {
            const value = e.target?.value || '';
            if (value !== '' && (e.code === 13 || e.keyCode === 13)) {
              console.log('AAAAAAAAAAAAAA', value, list);
              this.setList(value);
              console.log('AAAAAAAAAAAAAA', value, list);
              e.target.value = '';
            }
          }}
        />
        <br />
        <ul>
          {list?.map((item, i) => (
            <li key={i}>
              {item} -{' '}
              <button onClick={() => this.removeItem(i)}>remove</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
