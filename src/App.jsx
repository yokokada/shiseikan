import React, { useState, useEffect } from 'react';
import './App.css';
import Confetti from 'react-confetti';
import Modal from 'react-modal';

const questions = [
  "あなたが人からされてむかっとすること何ですか？\nそれはどうしてですか?",
  "あなたが悲しくなることは？\nそれはどうしてですか?",
  "今までで、一番嬉しかったことは？\nそれはどうしてですか?",
  "あなたが一番穏やかでいられる時はどんな時ですか？\nそれはどうしてですか?",
  "今までで一番感動した出来事を教えてください。\nそれはどうしてですか?",
  "今までで一番言われて傷ついた言葉はなんですか？\nそれはどうしてですか？",
  "どの季節が好きですか？\nその理由は？",
  "あなたの好きな色は？\nその色はいつから好きですか？なぜ好きなのでしょうか？",
  "あなたが腹を抱えて笑った出来事を教えてください。\nそれはいつ、誰との出来事ですか？",
  "タイムマシーンで過去に戻れるとしたら、戻りますか？\n戻る場合はいつですか？なぜ戻りたいのでしょうか？",
  "あなたは自分の性格をどう思いますか？",
  "あなたは人からどう思われていますか？",
  "「あなたらしく」いるために必要なことはなんですか？\nそれはどうしてですか？",
  "5年後の今日は何していますか？\n10年後の今日は何していますか？"
];

Modal.setAppElement('#root'); // アクセシビリティのために必要

function App() {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [showList, setShowList] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [allAnswered, setAllAnswered] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const savedAnsweredQuestions = JSON.parse(localStorage.getItem('answeredQuestions')) || [];
    setAnsweredQuestions(savedAnsweredQuestions);
  }, []);

  useEffect(() => {
    if (answeredQuestions.length === questions.length) {
      setAllAnswered(true);
      setModalIsOpen(true); // 全て答えたらモーダルを開く
    } else {
      setAllAnswered(false);
    }
  }, [answeredQuestions]);

  const getRandomQuestion = () => {
    const unansweredQuestions = questions.filter(q => !answeredQuestions.includes(q));
    if (unansweredQuestions.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
    setCurrentQuestion(unansweredQuestions[randomIndex]);
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

  const handleAnswerClick = () => {
    const updatedAnsweredQuestions = [...answeredQuestions, currentQuestion];
    setAnsweredQuestions(updatedAnsweredQuestions);
    localStorage.setItem('answeredQuestions', JSON.stringify(updatedAnsweredQuestions));
    setCurrentQuestion("");
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
                  style={{ color: selectedQuestionIndex === index ? 'orange' : answeredQuestions.includes(question) ? '#ccc' : '#0a317f' }}
                >
                  {formatQuestion(question)}
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <p style={{ whiteSpace: 'pre-line' }}>{currentQuestion ? formatQuestion(currentQuestion) : "質問がここに表示されます"}</p>
              {currentQuestion && <button onClick={handleAnswerClick}>答えた</button>}
            </div>
          )}
        </div>
        <p>答えた質問数: {answeredQuestions.length} / {questions.length}</p>

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
      </header>
    </div>
  );
}

export default App;
