import * as React from 'react';
import {Component} from 'react';

interface IState {
    overTen: boolean;
    onReset: any;
}

class HighScore extends Component<IState> {
    render() {
        if(this.props.overTen) {
        return (
            <div>
                <h3>Beat high score of 10!</h3>
                <button onClick={this.props.onReset}>Reset</button>
            </div>
            )
        } else {
            return null;
        }
    }
}

export default HighScore;