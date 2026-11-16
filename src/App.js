import { useEffect, useState, useRef } from "react";
import "./App.css";
import mbtiData from "./data/mbtiData.json";

function Header(props) {
  return (
    <header>
      <div id="title">
        <p className="title">{props.title}</p>
      </div>
    </header>
  );
}

function MbtiTest({ answers, setAnswers, setResult, result, setMessages }) {
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
    // setResult(newAnswer.join(""));
  };

  return (
    <div className="mbti-radio-box">
      <img
        src={`/${result.toLowerCase()}.png`}
        alt={result}
        className="mbtiImage"
      />
      {mbtiRows.map((row, rowIndex) => (
        <div key={rowIndex} className="radio-row">
          {row.map((item) => (
            <label key={item.label} className="radio-option">
              <input
                type="radio"
                name={item.name}
                value={item.label}
                checked={answers[item.id] === item.label}
                onChange={() => selectAnswer(item.id, item.label)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      ))}

      <button
        id="pick"
        onClick={() => {
          setResult(answers.join(""));
          setMessages([]);
        }}
      >
        Pick Me!
      </button>
    </div>
  );
}

// AI API 호출 함수

const callAIAPI = async (userMessage, systemPrompt) => {
  try {
    const response = await fetch("http://localhost:5001/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMessage: userMessage,
        systemPrompt: systemPrompt,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("서버 오류:", data.error);
      return "앗, AI와 연결하는 중에 문제가 생겼어요!";
    }

    return data.reply;
  } catch (error) {
    console.error("네트워크 오류:", error);
    return "앗, AI 서버에 연결할 수 없어요!";
  }
};

function Content({ result }) {
  const [imageMessage, setInputmessage] = useState("");
  const [chatList, setChatList] = useState([]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  useEffect(() => {
    setChatList([]);
  }, [result]);
  const downloadChatHistory = () => {
    if (chatList.length === 0) {
      alert("다운로드할 대화 내역이 없습니다!");
      return;
    }

    const formattedText = chatList
      .map((chat) => `[${chat.sender === "user" ? "나" : result}] ${chat.text}`)
      .join("\n\n");

    const blob = new Blob([formattedText], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${result}_대화내역.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const inputButton = async () => {
    if (imageMessage.trim() === "") return;

    const userMsg = imageMessage;
    setChatList((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInputmessage("");

    const currentMbti = result || "ESTJ";
    const currentMbtiData = mbtiData[currentMbti];
    const systemPrompt = currentMbtiData
      ? currentMbtiData.systemPrompt ||
        currentMbtiData.description ||
        `너는 ${currentMbti} 성격을 가진 친근한 챗봇이야. ${currentMbti} 특유의 말투와 성격으로 대답해줘.`
      : `너는 ${currentMbti} 성격을 가진 챗봇이야.`;

    const aiResponseText = await callAIAPI(userMsg, systemPrompt);

    setChatList((prev) => [...prev, { sender: "ai", text: aiResponseText }]);
  };

  return (
    <div>
      <img
        src="/be29715341b37b326f8de4eb935126fbc922f34f.png"
        className="img"
        alt="대화 내역 다운로드"
        onClick={downloadChatHistory}
        style={{ cursor: "pointer" }}
      />
      <h1 className="mbti_title">{result}</h1>
      <div className="content">
        <div className="chat-messages-container">
          {chatList.map((chat, index) => (
            <div key={index} className={`chat-bubble ${chat.sender}`}>
              <p>{chat.text}</p>
            </div>
          ))}
          {/* 💡 핵심: 스크롤이 찾아갈 마지막 위치 지정 태그 추가! */}
          <div ref={chatEndRef} />
        </div>

        <div className="input-box">
          <input
            className="chatInpt"
            type="text"
            value={imageMessage}
            onChange={(e) => setInputmessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                e.preventDefault();
                inputButton();
              }
            }}
            placeholder="메시지를 입력하세요..."
          />
          <button className="inputButton" onClick={inputButton}>
            click
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [answers, setAnswers] = useState(["E", "S", "T", "J"]);
  const [result, setResult] = useState("ESTJ");
  const [messages, setMessages] = useState([]);

  return (
    <div id="outer">
      <Header title="AI Chat Maker"></Header>
      <MbtiTest
        answers={answers}
        setAnswers={setAnswers}
        setResult={setResult}
        result={result}
        setMessages={setMessages}
      />
      <Content result={result} messages={messages} setMessages={setMessages} />
    </div>
  );
}

export default App;
