import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    option: "Bin",
    message: "",
    color: "hit",
    classMessage: "message",
    inputValue: "",
    result: 0,
    classResult: "result",
    messageFooter: "",
  };

  //Verifica se é um numero

  isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  //Conversão de Decimal para Binario

  conversionBtD = (num) => {
    for (let n of num) {
      if (n !== "0" && n !== "1") {
        this.setState({
          message: "You entered a non-binary digit (please enter only 0 or 1).",
          messageFooter: "Waiting for a valid binary number...",
          color: "error",
          classResult: "result",
        });
        return;
      }
    }

    var result = parseInt(num, 2);

    this.setState({
      message: "Here is your decimal!",
      messageFooter: "",
      color: "hit",
      result,
    });
  };

  //Conversão de Decimal para Binario

  conversionDtB = (num) => {
    let result = parseInt(num, 10).toString(2);

    this.setState({
      message: "Here is your binario!",
      result,
      messageFooter: "",
      color: "hit",
      option: "Dec",
    });
  };

  //Lida com as conversões

  handleConversions = (num, option) => {
    if (!num) {
      this.setState({
        message: "",
        color: "hit",
        classMessage: "message",
        result: 0,
        classResult: "result",
        messageFooter: "",
      });
      return;
    }
    if (!this.isNumber(num)) {
      this.setState({
        classResult: "result",
        classMessage: "message active",
        message:
          "You entered a character that is not a number (type numbers 0 through 9)",
        messageFooter: "Waiting for a valid number...",
        color: "error",
      });
      return;
    }

    this.setState({
      classMessage: "message active",
      classResult: "result active",
    });

    console.log(option);

    if (option === "Bin") {
      this.conversionBtD(num);
    }

    if (option === "Dec") {
      this.conversionDtB(num);
    }
  };

  //Lida com a escolha entre Decimal e Binario

  handleChoice = (choice) => {
    const { option, inputValue } = this.state;

    if (option === choice) {
      return;
    }
    this.setState({ option: choice });
    this.handleConversions(inputValue, choice);
  };

  //Lida com a entrada de valores

  handleInputchange = (e) => {
    this.setState({
      inputValue: e.target.value,
      classMessage: "message active",
      classResult: "result active",
    });

    const { option } = this.state;

    this.handleConversions(e.target.value, option);
  };

  render() {
    const {
      inputValue,
      result,
      message,
      classMessage,
      color,
      classResult,
      messageFooter,
    } = this.state;
    return (
      <div className="app">
        <header>
          <span>000</span>
          <h1>Bin2Dec</h1>
          <span>000</span>
        </header>

        <div className="content">
          <p>Enter a binary number, get a decimal conversion.</p>
        </div>

        <div className="form">
          <div className="check">
            <span>
              <input
                type="radio"
                name="option"
                value="Bin"
                defaultChecked
                onClick={() => this.handleChoice("Bin")}
              />{" "}
              Bínario
            </span>

            <span>
              <input
                type="radio"
                name="option"
                value="Dec"
                onClick={() => this.handleChoice("Dec")}
              />{" "}
              Decimal
            </span>
          </div>

          <span className={classMessage} id={color}>
            {message}
          </span>

          <input
            className="input"
            type="text"
            maxLength="10"
            value={inputValue}
            onChange={this.handleInputchange}
          />
        </div>

        <footer>
          <span className="footer__error">{messageFooter}</span>

          <span className={classResult}>{result}</span>
        </footer>
      </div>
    );
  }
}

export default App;
