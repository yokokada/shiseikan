import React, { useState } from 'react';
import './App.css';

const questions = [
  "あなたが人からされてむかっとすること何ですか？それはどうしてですか?",
  "あなたが悲しくなることは？それはどうしてですか?",
  "今までで、一番嬉しかったことは？それはどうしてですか?",
  "あなたが一番穏やかでいられる時はどんな時ですか？それはどうしてですか?",
  "今までで一番感動した出来事を教えてください。それはどうしてですか?",
  "今までで一番言われて傷ついた言葉はなんですか？それはどうしてですか？",
  "どの季節が好きですか？その理由は？",
  "あなたの好きな色は？その色はいつから好きですか？なぜ好きなのでしょうか？",
  "あなたが腹を抱えて笑った出来事を教えてください。それはいつ、誰との出来事ですか？",
  "タイムマシーンで過去に戻れるとしたら、戻りますか？戻る場合はいつですか？なぜ戻りたいのでしょうか？",
  "あなたは自分の性格をどう思いますか？",
  "あなたは人からどう思われていますか？",
  "「あなたらしく」いるために必要なことはなんですか？それはどうしてですか？",
  "5年後の今日は何していますか？10年後の今日は何していますか？"
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [showList, setShowList] = useState(false);

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setShowList(false);
  };

  const toggleQuestionList = () => {
    if (showList) {
      setCurrentQuestion(""); // 一覧表示を消すときに質問をクリア
    }
    setShowList(!showList);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>IHL死生観・ミッションステートメントセミナー事前課題②</h3>
        <p>＜ジャーナリングで、1日5分、自分と向き合ってみよう＞</p>
        <p>どちらかを選んでボタンを押すとジャーナリングの質問が出てきますので、ご自身のノートに書き込んでみてください。<br/>ジャーナリングはメモをするのではなく書く方が効果的と言われています。</p>
       <div>
         <button onClick={getRandomQuestion}>ランダム表示</button>
         <button onClick={toggleQuestionList}>{showList ? "一覧表示を消す" : "一覧から選ぶ"}</button>
       </div>
        <div className='q_box'>
          {showList ? (
            <ul className='question-list'>
              {questions.map((question, index) => (
                <li key={index} onClick={() => setCurrentQuestion(question)}>
                  {question}
                </li>
              ))}
            </ul>
          ) : (
            <p>{currentQuestion || "質問がここに表示されます"}</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
