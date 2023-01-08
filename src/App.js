import { evaluate } from "mathjs";
import { useState } from "react";

const buttons = [
  { id: "clear", value: "C", key: "Delete" },
  { id: "divide", value: "/", key: "/", className: "operator" },
  { id: "multiply", value: "*", key: "106", className: "operator" },
  { id: "seven", value: "7", key: "7" },
  { id: "eight", value: "8", key: "8" },
  { id: "nine", value: "9", key: "9" },
  { id: "subtract", value: "-", key: "-", className: "operator" },
  { id: "four", value: "4", key: "4" },
  { id: "five", value: "5", key: "5" },
  { id: "six", value: "6", key: "6" },
  { id: "add", value: "+", key: "+", className: "operator" },
  { id: "one", value: "1", key: "1" },
  { id: "two", value: "2", key: "2" },
  { id: "three", value: "3", key: "3" },
  { id: "equals", value: "=", key: "Enter", className: "operator" },
  { id: "zero", value: "0", key: "0" },
  { id: "decimal", value: ".", key: "." },
];

function App() {
  const [expression, setExpression] = useState("");
  const [displayInput, setDisplayInput] = useState("0");

  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const operators = ["/", "*", "+", "-"];

  const isLastCharOperator = () => {
    return operators.some((symbol) => expression.endsWith(symbol));
  };

  const handleSubmit = () => {
    if (expression.includes("=")) {
      setExpression(displayInput);
    } else {
      const result = evaluate(expression);
      setExpression(`${expression}=${result}`);
      setDisplayInput(result);
    }
  };

  const handleClear = () => {
    setExpression("");
    setDisplayInput("0");
  };

  const handleNumbers = (number) => {
    if (expression === "0" && number === "0") {
      setDisplayInput("0");
      setExpression("0");
    } else if (expression.match("=")) {
      setDisplayInput(number);
      setExpression(number);
    } else {
      if (!expression.length || isLastCharOperator()) {
        setDisplayInput(number);
      } else {
        setDisplayInput((prev) => prev + number);
      }
      setExpression((prev) => prev + number);
    }
  };

  const handleOperator = (operator) => {
    if (expression.length < 1 && operator !== "-") {
      return;
    }
    if (
      (isLastCharOperator() && operator !== "-") ||
      expression[expression.length - 1] === "-"
    ) {
      const isPenultimateCharSymbol = operators.some(
        (symbol) => expression[expression.length - 2] === symbol
      );
      if (isPenultimateCharSymbol) {
        setExpression((prev) => prev.substring(0, prev.length - 2) + operator);
      } else {
        if (expression[expression.length - 1] === "-") {
          setExpression((prev) => prev + operator);
        } else {
          setExpression(
            (prev) => prev.substring(0, prev.length - 1) + operator
          );
        }
      }
    } else if (expression.includes("=")) {
      setExpression(displayInput + operator);
    } else {
      setExpression((prev) => prev + operator);
    }
    setDisplayInput(operator);
  };

  const handleDecimal = () => {
    if (!displayInput.includes(".")) {
      console.log("decimal");
      setDisplayInput((prev) => prev + ".");
      setExpression((prev) => prev + ".");
    }
  };

  const handleClick = (e) => {
    const { value } = e.target;
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case "C":
        handleClear();
        break;
      case "=":
        handleSubmit();
        break;
      case number:
        handleNumbers(value);
        break;

      case operator:
        handleOperator(value);
        break;

      case ".":
        handleDecimal();
        break;

      default:
        console.log("error: no cases");
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="formula">{expression}</div>
        <div id="display">{displayInput}</div>
      </div>
      {buttons.map(({ id, value, className }) => (
        <button
          key={id}
          id={id}
          onClick={handleClick}
          value={value}
          className={className}
        >
          {value}
        </button>
      ))}
    </div>
  );
}

export default App;
