import React, { useState } from 'react';
import './App.css';

const questions = [
  "あなたが人からされてむかっとすること何ですか？\nそれはどうしてですか?",
  "あなたが悲しくなることは？\nそれはどうしてですか?",
  "今までで、一番嬉しかったことは？\nそれはどうしてですか?",
  "あなたが一番穏やかでいられる時はどんな時ですか？\nそれはどうしてですか?",
  "今までで一番感動した出来事を教えてください。\nそれはどうしてですか?",
  "今までで一番言われて傷ついた言葉はなんですか？\nそれはどうしてですか？",
  "どの季節が好きですか？\nその理由は？",
  "あなたの好きな色は？\nその色はいつから好きですか？\nなぜ好きなのでしょうか？",
  "あなたが腹を抱えて笑った出来事を教えてください。\nそれはいつ、誰との出来事ですか？",
  "タイムマシーンで過去に戻れるとしたら、戻りますか？\n戻る場合はいつですか？\nなぜ戻りたいのでしょうか？",
  "あなたは自分の性格をどう思いますか？",
  "あなたは人からどう思われていますか？",
  "「あなたらしく」いるために必要なことはなんですか？\nそれはどうしてですか？",
  "5年後の今日は何していますか？\n10年後の今日は何していますか？"
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [showList, setShowList] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setShowList(false);
    setSelectedQuestionIndex(null);
  };

  const toggleQuestionList = () => {
    if (showList) {
      setCurrentQuestion(""); // 一覧表示を消すときに質問をクリア
    }
    setShowList(!showList);
    setSelectedQuestionIndex(null);
  };

  const handleQuestionClick = (question, index) => {
    setCurrentQuestion(question);
    setSelectedQuestionIndex(index);
    setShowList(false);
  };

  const formatQuestion = (question) => {
    return question.split('\n').map((text, index) => (
      <React.Fragment key={index}>
        {text}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>IHL死生観・ミッションステートメントセミナー事前課題②</h3>
        <p>ジャーナリングで、1日5分、自分と向き合ってみよう</p>
        <p>どちらかを選んでボタンを押すとジャーナリングの質問が出てきますので、<br />ご自身のノートに書き込んでみてください。<br />ジャーナリングはメモをするのではなく書く方が効果的と言われています。</p>
       
        <button onClick={getRandomQuestion}>ランダム表示</button>
        <button onClick={toggleQuestionList}>{showList ? "一覧表示を消す" : "一覧から選ぶ"}</button>

        <div className='q_box'>
          {showList ? (
            <ul className='question-list'>
              {questions.map((question, index) => (
                <li
                  key={index}
                  onClick={() => handleQuestionClick(question, index)}
                  style={{ color: selectedQuestionIndex === index ? 'orange' : '#0a317f' }}
                >
                  {formatQuestion(question)}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ whiteSpace: 'pre-line' }}>{currentQuestion ? formatQuestion(currentQuestion) : "質問がここに表示されます"}</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
