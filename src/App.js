import React, { Component } from 'react';
import './App.css';

const Display = (props) => {
  return (
    <div id="display">
      {props.display}
    </div>
  )
}

const Buttons = (props) => {
  return (
    <div id="buttons">
      <div id="numbers">
        <button id="one" value="1" onClick={props.numbers}>1</button>
        <button id="two" value="2" onClick={props.numbers}>2</button>
        <button id="three" value="3" onClick={props.numbers}>3</button>
        <button id="four" value="4" onClick={props.numbers}>4</button>
        <button id="five" value="5" onClick={props.numbers}>5</button>
        <button id="six" value="6" onClick={props.numbers}>6</button>
        <button id="seven" value="7" onClick={props.numbers}>7</button>
        <button id="eight" value="8" onClick={props.numbers}>8</button>
        <button id="nine" value="9" onClick={props.numbers}>9</button>
        <button id="decimal" value="." onClick={props.numbers}>.</button>
        <button id="zero" value="0" onClick={props.numbers}>0</button>
      </div>
      <div id="operators">
        <button id="clear" onClick={props.clear}>C</button>
        <button id="add" value="add" onClick={props.operate}>+</button>
        <button id="subtract" value="subtract" onClick={props.operate}>-</button>
        <button id="multiply" value="multiply" onClick={props.operate}>x</button>
        <button id="divide" value="divide" onClick={props.operate}>/</button>
        <button id="equals" onClick={props.equal}>=</button>
      </div>
    </div>
  )
}

class App extends Component {
  state = {
    display: 0,
    operand1: 0,
    operand2: 0,
    operator: "",
    decimal: false,
    lastInput: "",
    backup: {
      operand1: 0,
      operand2: 0,
      operator: ""
    },
    doubleOperator: false
  }

  initialState = this.state;

  numbers(e) {
    if (e.target.value === ".") {
      if (!this.state.decimal) {
        this.setState({
          decimal: true
        })
        if (this.state.display !== 0 && this.state.display !== "0") {
          this.setState({
            display: this.state.display + e.target.value,
            lastInput: "number"
          })
        } else {      
          this.setState({
            display: e.target.value,
            lastInput: "number"
          })
        }
      }
    } else {
      if (this.state.display !== 0 && this.state.display !== "0") {
        this.setState({
          display: this.state.display + e.target.value,
            lastInput: "number"
        })
      } else {      
        this.setState({
          display: e.target.value,
            lastInput: "number"
        })
      }
    }
  }

  equal() {
    if (this.state.operand1 && this.state.display && this.state.operator) {
      const display = this.calculate(this.state.operand1, this.state.display, this.state.operator);

      this.setState({
        display: display,
        operator: ""
      })
    }
  }

  calculate(operand1, operand2, operator) {
    if (operator === "add") {
      return parseFloat(operand1) + parseFloat(operand2);
    } else if (operator === "subtract") {
      return parseFloat(operand1) - parseFloat(operand2);
    } else if (operator === "multiply") {
      return parseFloat(operand1) * parseFloat(operand2);
    } else if (operator === "divide") {
      return parseFloat(operand1) / parseFloat(operand2);
    }
  }

  operate(e) {
    if (this.state.operator === "") {
      const display = this.state.display;
      
      this.setState({
        display: 0,
        operand1: display,
        operator: e.target.value,
        decimal: false
      })
      
    } else {
      const display = this.state.display;
      const operand1 = this.calculate(this.state.operand1, this.state.display, this.state.operator);
      
      this.setState({
        display: 0,
        operand1: operand1,
        operand2: display,
        operator: e.target.value,
        decimal: false
      }) 
    }
    
    this.setState({
      lastInput: "operator"
    })
  }

  clear() {
    this.setState(this.initialState)
  }

  render() {
    return (
      <div id="calculator">
        <Display display={this.state.display} />
        <Buttons
          equal={() => this.equal()}
          numbers={(e) => this.numbers(e)}
          clear={() => this.clear()}
          operate={(e) => this.operate(e)} />
      </div>
    )
  }
}

export default App;