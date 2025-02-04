"use client";
import React, { useEffect, useState, useContext } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button, ButtonGroup } from "@heroui/button";
import { useTimer } from "react-use-precision-timer";
import { ArrayContext } from "@/components/global";
import { useLocation } from "react-router-dom";

const SpeechToText = () => {
  const { splits, setSplits } = useContext(ArrayContext);

  const location = useLocation();

  useEffect(() => {
    SpeechRecognition.stopListening();
    stopwatch.stop();
    resetTranscript();
  }, [location]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const Small = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
  };

  const [randomNum, setRandomNum] = useState({ question: "", answer: [] });
  const [elapsed, setElapsed] = useState(0);

  const stopwatch = useTimer(
    { delay: 140 },
    React.useCallback(
      () => setElapsed(stopwatch.getElapsedRunningTime() / 1000),
      []
    )
  );

  const generateRandomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const question = () => {
    const oneRandomNum = generateRandomNumber(2, 12);
    const twoRandomNum = generateRandomNumber(2, 100);
    const product = oneRandomNum * twoRandomNum;
    const question = `${Math.min(oneRandomNum, twoRandomNum)} * ${Math.max(oneRandomNum, twoRandomNum)}`;

    if (oneRandomNum * twoRandomNum < 10) {
      setRandomNum({
        question: question,
        answer: [product, Small[product]],
      });
    } else {
      setRandomNum({
        question: question,
        answer: [product, product.toString().replace(/(.{2})$/, ":$1")],
      });
    }
  };
  const reset = () => {
    resetTranscript();
    question();
    stopwatch.start();
  };

  const startSession = () => {
    if (randomNum.question == "") {
      question();
    }
    SpeechRecognition.startListening({ continuous: true });
    stopwatch.start();
  };

  const stopSession = () => {
    SpeechRecognition.stopListening();
    stopwatch.stop();
  };

  useEffect(() => {
    if (randomNum.answer.some((v) => transcript.includes(v))) {
      setSplits([
        ...splits,
        { question: randomNum.question, elapsed: elapsed },
      ]);
      resetTranscript();
      question();
      stopwatch.start();
    }
  }, [transcript, randomNum]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&apos;t support speech recognition.</span>;
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center">
        {/* <h2 className="text-xl">Microphone: {listening ? "on" : "off"}</h2> */}
        <ButtonGroup>
          {/* <Button onPress={() => startSession()}>Start</Button>
          <Button onPress={SpeechRecognition.stopListening}>Stop</Button> */}
          <Button
            size="lg"
            variant="shadow"
            onPress={listening ? stopSession : () => startSession()}
            color={listening ? "success" : "danger"}
          >
            mic {listening ? "on" : "off"}
          </Button>
          <Button size="lg" onPress={reset} variant="shadow" color="warning">
            reset
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col items-center gap-6">
        {elapsed > 0 ? (
          <p className="text-4xl font-bold">{elapsed}</p>
        ) : (
          <p className="text-4xl font-bold">⬆️Turn on the mic to play⬆️</p>
        )}
        {/* <p className="text-4xl font-bold">{elapsed}</p> */}
        <p className="text-8xl font-bold">{randomNum.question}</p>
        <p className="text-xl max-w-96">{transcript}</p>
      </div>
    </div>
  );
};

export default SpeechToText;
