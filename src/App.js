 import logo from './logo.svg';
 import { useState } from "react";
import './App.css';
function Header(props){
  console.log('props',props,props.title);
  return     <header>
        <div id="title">
        <p className='title'>{props.title}</p>
        </div>
      </header>

}
function MbtiTest(){
  const [answers, setAnswers] = useState(["","","",""]);
  const [result, setResult] =useState("");
  const [showResult, setShowResult] = useState(false);
  const selectAnswer = (index, value) =>{
    const newAnswer = [...answers];
    newAnswer[index] =value;
    setAnswers(newAnswer);
  };

    const showMbtiResult = () => {   
    let mbti = "";
    for(let i=0; i<answers.length;i++){
    mbti += answers[i];
  }

  setResult(mbti);
  setShowResult(true);  

};
    
  
  return (
    <div>
    <div id="radios">
    <input
    type="radio" name="question1" value="E" onChange = {()=> selectAnswer(0,"E")}
    />E
    </div>
    <div id="radios1">    
    <input
    type="radio" name="question1" value="I" onChange={()=> selectAnswer(0,"I")}
    />I
    </div>
    <div id="radios2">    
    <input
    type="radio" name="question2" value="S" onClick={()=>selectAnswer(1,"S")}
    />S
    </div>
    <div id="radios3">
    <input type="radio" name="question2" value="N" onClick={()=>selectAnswer(1,"N")}/>
    N
    </div>
    <div id="radios4">
    <input
    type="radio" name="question3" value="T" onClick={()=>selectAnswer(2,"T")}/>
    T
    </div>
    <div id="radios5">
    <input
    type="radio" name="question3" value="F" onClick={()=>selectAnswer(2,"F")}
    />
    F
    </div>
    <div id="radios6">
    <input 
    type="radio" name="question4" value="J" onClick={()=>selectAnswer(3,"J")}/>
    J
    </div>
    <div id="radios7">
    <input
    type="radio" name="question4" value="P" onClick={()=>selectAnswer(3,"P")}
    />P
    </div>

    <button id="pick" onClick={showMbtiResult}>
      Pick Me!
    </button>
      <div id="mbti">
        {showResult && <h1 className='mbti_title'>{result}</h1>}
      </div>
    </div>
  );
  
}

function Content(){
  return(
  <div>
      <img src="/be29715341b37b326f8de4eb935126fbc922f34f.png" className='img'/>
    <div className="content">
    </div>
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
