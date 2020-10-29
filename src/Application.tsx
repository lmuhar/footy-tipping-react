import * as React from 'react';
import {Component} from 'react';
import HighScore from './HighScore';
import './scss/style.scss';

interface IProps {}

interface IState {
    count: number;
    overTen: boolean;
}

class Application extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            count: 0,
            overTen: false
        }
    }

    handleClick() {
        this.setState({count: this.state.count + 1});
    }

    resetCount(e: any) {
        this.setState({
            count: 0,
            overTen: false
        })
    }

    componentDidUpdate(props: IProps, state: IState) {
        if (this.state.count > 10 && this.state.count !== state.count && !this.state.overTen) {
            this.setState({overTen: true})
        }
    }

    render() {
        return (
          <div>
              <h1>You clicked the button {this.state.count} times</h1>
              <HighScore
                overTen={this.state.overTen}
                onReset={(e: any) => this.resetCount(e)}
              />
              <span>
                  <button onClick={() => this.handleClick()}>Click Me</button>
              </span>
          </div>
      );
    }
}

export default Application;