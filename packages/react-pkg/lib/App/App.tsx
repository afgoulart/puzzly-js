import React, { Component } from 'react';
import './app.css';

class App extends Component {
  [x: string]: any;

  constructor(props: any) {
    super(props);

    this.state = {
      list: [],
    };
  }

  setList(value: string) {
    const { list } = this.state as any;
    this.setState({
      list: list.concat(value),
    });
  }

  removeItem(indice: number) {
    const { list } = this.state as any;
    this.setState({
      list: list.reduce(
        (acc: string[], item: string, idx: number) =>
          idx === indice ? acc : acc.concat(item),
        []
      ),
    });
  }

  render() {
    const { list } = this.state as any;
    return (
      <div>
        <h1>Todo's List</h1>
        <input
          placeholder="What will you do?"
          onKeyUp={(e: any) => {
            const value = e.target?.value || '';
            if (value !== '' && (e.code === 13 || e.keyCode === 13)) {
              this.setList(value);
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
