import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";

function Header(props) {
  console.log("props", props, props.title);
  return (
    <header>
      <div id="title">
        <p className="title">{props.title}</p>
      </div>
    </header>
  );
}
function MbtiTest() {
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);
  //원문 질문 데이터 배열
  const mbtiRows = [
    [
      { id: 0, name: "question1", label: "E" },
      { id: 1, name: "question2", label: "S" },
      { id: 2, name: "question3", label: "T" },
      { id: 3, name: "question4", label: "J" },
    ],
    [
      { id: 0, name: "question1", label: "I" },
      { id: 1, name: "question2", label: "N" },
      { id: 2, name: "question3", label: "F" },
      { id: 3, name: "question4", label: "P" },
    ],
  ];
  const selectAnswer = (index, value) => {
    const newAnswer = [...answers];
    newAnswer[index] = value;
    setAnswers(newAnswer);
  };

  const showMbtiResult = () => {
    let mbti = "";
    for (let i = 0; i < answers.length; i++) {
      mbti += answers[i];
    }
    setResult(mbti);
    setShowResult(true);
  };

  return (
    <div className="mbti-radio-box">
      {mbtiRows.map((row, rowIndex) => (
        <div key={rowIndex} className="radio-row">
          {row.map((item) => (
            <label key={item.label} className="radio-option">
              <input
                type="radio"
                name={item.name}
                value={item.label}
                onChange={() => selectAnswer(item.id, item.label)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      ))}
      <button id="pick" onClick={showMbtiResult}>
        Pick Me!
      </button>
      <div id="mbti">
        {showResult && <h1 className="mbti_title">{result}</h1>}
      </div>
    </div>
  );
}
function Content() {
  return (
    <div>
      <img
        src="/be29715341b37b326f8de4eb935126fbc922f34f.png"
        className="img"
      />
      <div className="content"></div>
    </div>
  );
}
function App() {
  return (
    <div id="outer">
      <Header title="AI Chat Maker"></Header>
      <MbtiTest></MbtiTest>
      <Content></Content>
    </div>
  );
}

export default App;
