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
import { IoSettingsSharp } from "react-icons/io5";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { CheckboxGroup, Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";

const SpeechToText = () => {
  const { splits, setSplits, settings, setSettings } = useContext(ArrayContext);

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

  const subtractionQuestion = () => {
    const oneRandomNum = generateRandomNumber(
      settings.additionx1,
      settings.additiony1
    );
    const twoRandomNum = generateRandomNumber(
      settings.additionx2,
      settings.additiony2
    );
    const sum = oneRandomNum + twoRandomNum;
    const question = `${sum} - ${oneRandomNum}`;

    if (sum < 10) {
      setRandomNum({
        question: question,
        answer: [twoRandomNum, Small[twoRandomNum]],
      });
    } else {
      setRandomNum({
        question: question,
        answer: [
          twoRandomNum,
          twoRandomNum.toString().replace(/(.{2})$/, ":$1"),
        ],
      });
    }
  };

  const additionQuestion = () => {
    const oneRandomNum = generateRandomNumber(
      settings.additionx1,
      settings.additiony1
    );
    const twoRandomNum = generateRandomNumber(
      settings.additionx2,
      settings.additiony2
    );
    const sum = oneRandomNum + twoRandomNum;
    const question = `${oneRandomNum} + ${twoRandomNum}`;

    if (sum < 10) {
      setRandomNum({
        question: question,
        answer: [sum, Small[sum]],
      });
    } else {
      setRandomNum({
        question: question,
        answer: [sum, sum.toString().replace(/(.{2})$/, ":$1")],
      });
    }
  };

  const multiplicationQuestion = () => {
    const oneRandomNum = generateRandomNumber(
      settings.multiplicationx1,
      settings.multiplicationy1
    );
    const twoRandomNum = generateRandomNumber(
      settings.multiplicationx2,
      settings.multiplicationy2
    );
    const product = oneRandomNum * twoRandomNum;
    const question = `${oneRandomNum} × ${twoRandomNum}`;

    if (product < 10) {
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

  const divisionQuestion = () => {
    const oneRandomNum = generateRandomNumber(
      settings.multiplicationx1,
      settings.multiplicationy1
    );
    const twoRandomNum = generateRandomNumber(
      settings.multiplicationx2,
      settings.multiplicationy2
    );
    const product = oneRandomNum * twoRandomNum;
    const question = `${product} ÷ ${oneRandomNum}`;

    if (twoRandomNum < 10) {
      setRandomNum({
        question: question,
        answer: [twoRandomNum, Small[twoRandomNum]],
      });
    } else {
      setRandomNum({
        question: question,
        answer: [
          twoRandomNum,
          twoRandomNum.toString().replace(/(.{2})$/, ":$1"),
        ],
      });
    }
  };

  const question = () => {
    const operations = [];

    if (settings.isAdditionUsed) operations.push("addition");
    if (settings.isSubtractionUsed) operations.push("subtraction");
    if (settings.isMultiplicationUsed) operations.push("multiplication");
    if (settings.isDivisionUsed) operations.push("division");

    if (operations.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * operations.length);

    if (operations[randomIndex] == "addition") additionQuestion();
    if (operations[randomIndex] == "subtraction") subtractionQuestion();
    if (operations[randomIndex] == "multiplication") multiplicationQuestion();
    if (operations[randomIndex] == "division") divisionQuestion();
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

  // reverse the order of the object and ...splits if you want to reverse the order the data is shown
  useEffect(() => {
    if (randomNum.answer.some((v) => transcript.includes(v))) {
      setSplits([
        { question: randomNum.question, elapsed: elapsed },
        ...splits,
      ]);
      resetTranscript();
      question();
      stopwatch.start();
    }
  }, [transcript, randomNum]);

  const {
    isOpen: isSettingsOpen,
    onOpen: onSettingsOpen,
    onOpenChange: onSettingsOpenChange,
  } = useDisclosure();

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
          <Button
            isIconOnly
            size="lg"
            onPress={onSettingsOpen}
            variant="shadow"
          >
            <IoSettingsSharp />
          </Button>
        </ButtonGroup>
        <Modal
          isOpen={isSettingsOpen}
          onOpenChange={onSettingsOpenChange}
          size="2xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Settings
                </ModalHeader>
                <ModalBody>
                  <CheckboxGroup
                    defaultValue={["add", "subtract", "multiply", "divide"]}
                  >
                    <Checkbox
                      value="add"
                      isSelected={settings.isAdditionUsed}
                      onValueChange={(isSelected: boolean) =>
                        setSettings({ ...settings, isAdditionUsed: isSelected })
                      }
                    >
                      Addition
                    </Checkbox>
                    <div className="flex flex-row">
                      <p>&emsp; &emsp;Range: (</p>
                      <Input
                        className="max-w-10"
                        size="sm"
                        value={settings.additionx1}
                        onValueChange={(value: string) =>
                          setSettings({
                            ...settings,
                            additionx1:
                              value === "" ? 0 : parseInt(value, 10) || 0,
                          })
                        }
                      />
                      <p>to</p>
                      <Input
                        className="max-w-10"
                        size="sm"
                        value={settings.additiony1}
                        onValueChange={(value: string) =>
                          setSettings({
                            ...settings,
                            additiony1:
                              value === "" ? 0 : parseInt(value, 10) || 0,
                          })
                        }
                      />
                      <p>) + (</p>
                      <Input
                        className="max-w-10"
                        size="sm"
                        value={settings.additionx2}
                        onValueChange={(value: string) =>
                          setSettings({
                            ...settings,
                            additionx2:
                              value === "" ? 0 : parseInt(value, 10) || 0,
                          })
                        }
                      />
                      <p>to</p>
                      <Input
                        className="max-w-10"
                        size="sm"
                        value={settings.additiony2}
                        onValueChange={(value: string) =>
                          setSettings({
                            ...settings,
                            additiony2:
                              value === "" ? 0 : parseInt(value, 10) || 0,
                          })
                        }
                      />
                      <p>)</p>
                    </div>
                    <Checkbox
                      value="subtract"
                      isSelected={settings.isSubtractionUsed}
                      onValueChange={(isSelected: boolean) =>
                        setSettings({
                          ...settings,
                          isSubtractionUsed: isSelected,
                        })
                      }
                    >
                      Subtraction
                    </Checkbox>
                    <p>&emsp; &emsp;Addition problems in reverse.</p>
                    <Checkbox
                      value="multiply"
                      isSelected={settings.isMultiplicationUsed}
                      onValueChange={(isSelected: boolean) =>
                        setSettings({
                          ...settings,
                          isMultiplicationUsed: isSelected,
                        })
                      }
                    >
                      Multiplication
                    </Checkbox>
                    <div className="flex flex-row">
                      <p>&emsp; &emsp;Range: (</p>
                      <Input
                        className="max-w-10"
                        size="sm"
                        value={settings.multiplicationx1}
                        onValueChange={(value: string) =>
                          setSettings({
                            ...settings,
                            multiplicationx1:
                              value === "" ? 0 : parseInt(value, 10) || 0,
                          })
                        }
                      />
                      <p>to</p>
                      <Input
                        className="max-w-10"
                        size="sm"
                        value={settings.multiplicationy1}
                        onValueChange={(value: string) =>
                          setSettings({
                            ...settings,
                            multiplicationy1:
                              value === "" ? 0 : parseInt(value, 10) || 0,
                          })
                        }
                      />
                      <p>) + (</p>
                      <Input
                        className="max-w-10"
                        size="sm"
                        value={settings.multiplicationx2}
                        onValueChange={(value: string) =>
                          setSettings({
                            ...settings,
                            multiplicationx2:
                              value === "" ? 0 : parseInt(value, 10) || 0,
                          })
                        }
                      />
                      <p>to</p>
                      <Input
                        className="max-w-10"
                        size="sm"
                        value={settings.multiplicationy2}
                        onValueChange={(value: string) =>
                          setSettings({
                            ...settings,
                            multiplicationy2:
                              value === "" ? 0 : parseInt(value, 10) || 0,
                          })
                        }
                      />
                      <p>)</p>
                    </div>
                    <Checkbox
                      value="divide"
                      isSelected={settings.isDivisionUsed}
                      onValueChange={(isSelected: boolean) =>
                        setSettings({ ...settings, isDivisionUsed: isSelected })
                      }
                    >
                      Division
                    </Checkbox>
                    <p>&emsp; &emsp;Multiplication problems in reverse.</p>
                  </CheckboxGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <div className="flex flex-col items-center gap-6">
        {elapsed > 0 ? (
          <p className="text-4xl font-bold">{elapsed}</p>
        ) : (
          <p className="text-xl font-bold">⬆️Turn on the mic to play⬆️</p>
        )}
        {/* <p className="text-4xl font-bold">{elapsed}</p> */}
        <p className="text-8xl font-bold">{randomNum.question}</p>
        <p className="text-xl max-w-96">{transcript}</p>
      </div>
    </div>
  );
};

export default SpeechToText;
