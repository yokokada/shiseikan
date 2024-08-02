import React, { useState, useEffect } from 'react';
import './App.css';
import Confetti from 'react-confetti';
import Modal from 'react-modal';

const questions = [
  "あなたが人からされてムカっとすること何ですか？\nそれはどうしてですか?",
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

Modal.setAppElement('#root'); // アクセシビリティのために必要

function App() {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [allAnswered, setAllAnswered] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [buttonText, setButtonText] = useState("スタート");

  useEffect(() => {
    const savedAnsweredQuestions = JSON.parse(localStorage.getItem('answeredQuestions')) || [];
    setAnsweredQuestions(savedAnsweredQuestions);
  }, []);

  useEffect(() => {
    if (answeredQuestions.length === questions.length) {
      setAllAnswered(true);
      setModalIsOpen(true); // 全て答えたらモーダルを開く
      setButtonText("全て回答！");
    } else if (answeredQuestions.length > 0) {
      setButtonText("次の質問");
    } else {
      setButtonText("スタート");
    }
  }, [answeredQuestions]);

  const getRandomQuestion = () => {
    const unansweredQuestions = questions.filter(q => !answeredQuestions.includes(q));
    if (unansweredQuestions.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
    setCurrentQuestion(unansweredQuestions[randomIndex]);
    setSelectedQuestionIndex(null);
  };

  const handleAnswerClick = () => {
    const updatedAnsweredQuestions = [...answeredQuestions, currentQuestion];
    setAnsweredQuestions(updatedAnsweredQuestions);
    localStorage.setItem('answeredQuestions', JSON.stringify(updatedAnsweredQuestions));
    setCurrentQuestion("");
  };

  const handleReset = () => {
    setAnsweredQuestions([]);
    localStorage.removeItem('answeredQuestions');
    setButtonText("スタート");
    setAllAnswered(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
        <h3>IHL死生観・ミッションステートメント<br />セミナー事前課題②</h3>
        <p>ジャーナリングで、1日5分、自分と向き合ってみよう</p>
        <p>ボタンを押すとジャーナリングの質問が出てきますので、ご自身のノートに書き込んでみてください。<br />ジャーナリングはスマホにメモをするのではなく、書く方が効果的と言われています。<br />質問は14問。全て答えると何か起こるかも！</p>
       
        <button className='start-button' onClick={getRandomQuestion}>{buttonText}</button>
        <p>答えた質問数: {answeredQuestions.length} / {questions.length}</p>

        <div className='q_box'>
          {currentQuestion ? (
            <div>
              <p style={{ whiteSpace: 'pre-line' }}>{formatQuestion(currentQuestion)}</p>
              <button className='answer-button' onClick={handleAnswerClick}>答えた</button>
            </div>
          ) : (
            <p>質問がここに表示されます</p>
          )}
        </div>

        

        {allAnswered && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Congratulations Modal"
            className="Modal"
            overlayClassName="Overlay"
          >
            <h2>おめでとう！質問に全て答え終わりました！</h2>
            <Confetti />
            <button onClick={closeModal}>閉じる</button>
          </Modal>
        )}

        <div className='answered-questions-box'>
          <h3>答えた質問</h3>
          <ul className='answered-question-list'>
            {answeredQuestions.map((question, index) => (
              <li key={index}>
                {index + 1}. {formatQuestion(question)}
              </li>
            ))}
          </ul>
            {allAnswered && (
            <button className='reset-button' onClick={handleReset}>リセットしてもう一度答える</button>
          )}
        </div>
      </header>
      <footer className="App-footer">
        <p>&copy; 2024 Yoko Okada</p>
      </footer>
    </div>
  );
}

export default App;
