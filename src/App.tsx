import React, { useState, useCallback } from 'react';
import { CHINESE_WORDS } from './data/words';
import { Avatar } from './components/Avatar';
import { WordDisplay } from './components/WordDisplay';
import { ActionButtons } from './components/ActionButtons';
import { Feedback } from './components/Feedback';
import { ProgressBar } from './components/ProgressBar';
import { useSpeech } from './hooks/useSpeech';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const currentWord = CHINESE_WORDS[currentIndex];
  const { speak, isSpeaking } = useSpeech(currentWord);
  
  const handleRecognitionEnd = useCallback(() => {
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      if (currentIndex < CHINESE_WORDS.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }, 2000);
  }, [currentIndex]);

  const { startListening, isListening, countdown } = useSpeechRecognition(handleRecognitionEnd);

  const isComplete = currentIndex === CHINESE_WORDS.length - 1 && showFeedback;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            <ProgressBar 
              current={currentIndex + 1} 
              total={CHINESE_WORDS.length} 
            />
            <Avatar 
              isActive={isSpeaking || isListening} 
              type={isListening ? 'listening' : 'speaking'} 
            />
            <WordDisplay word={currentWord} />
            {isComplete ? (
              <div className="text-center p-4 bg-green-50 rounded-lg text-green-600">
                <h3 className="font-bold text-xl mb-2">Congratulations! 🎉</h3>
                <p>You've completed all the words!</p>
              </div>
            ) : (
              <ActionButtons 
                onListen={speak}
                onTalk={startListening}
                isListening={isListening}
                isSpeaking={isSpeaking}
                countdown={countdown}
              />
            )}
            <Feedback show={showFeedback} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;