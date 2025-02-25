"use client";
import React, { useRef, useEffect, useState, useContext } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button, ButtonGroup } from "@heroui/button";
import { useTimer } from "react-use-precision-timer";
import { ArrayContext } from "@/components/global";
import { usePathname } from "next/navigation";
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
  const { splits, setSplits } = useContext(ArrayContext);

  const [settings, setSettings] = useState({
    operationsUsed: ["add", "subtract", "multiply", "divide"],
    additionx1: 2,
    additiony1: 100,
    additionx2: 2,
    additiony2: 100,
    multiplicationx1: 2,
    multiplicationy1: 12,
    multiplicationx2: 2,
    multiplicationy2: 100,
  });

  const location = usePathname();
  const result = location.split("/").map((_, index) =>
    location
      .split("/")
      .slice(0, index + 1)
      .join("/")
  );

  const inputRef = useRef(null);

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

  const autoFocusInput = () => {
    if (elapsed > 0) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    autoFocusInput();
  }, [listening]);

  const [value, setValue] = React.useState("");

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
    // const operations = [];

    // if (settings.isAdditionUsed) operations.push("addition");
    // if (settings.isSubtractionUsed) operations.push("subtraction");
    // if (settings.isMultiplicationUsed) operations.push("multiplication");
    // if (settings.isDivisionUsed) operations.push("division");

    if (settings.operationsUsed.length === 0) return null;

    const randomIndex = Math.floor(
      Math.random() * settings.operationsUsed.length
    );

    if (settings.operationsUsed[randomIndex] == "add") additionQuestion();
    if (settings.operationsUsed[randomIndex] == "subtract")
      subtractionQuestion();
    if (settings.operationsUsed[randomIndex] == "multiply")
      multiplicationQuestion();
    if (settings.operationsUsed[randomIndex] == "divide") divisionQuestion();
  };

  const reset = () => {
    resetTranscript();
    question();
    stopwatch.start();
    autoFocusInput();
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
        {
          question: randomNum.question,
          elapsed: elapsed,
          answer_method: "voice",
        },
        ...splits,
      ]);
      resetTranscript();
      question();
      setValue("");
      stopwatch.start();
    }
    if (randomNum.answer.some((v) => value == v)) {
      setSplits([
        {
          question: randomNum.question,
          elapsed: elapsed,
          answer_method: "keyboard",
        },
        ...splits,
      ]);
      resetTranscript();
      question();
      setValue("");
      stopwatch.start();
    }
  }, [transcript, randomNum, value]);

  const {
    isOpen: isSettingsOpen,
    onOpen: onSettingsOpen,
    onOpenChange: onSettingsOpenChange,
  } = useDisclosure();

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center">
        <ButtonGroup>
          <Button
            color={listening ? "success" : "danger"}
            size="lg"
            variant="shadow"
            onPress={listening ? stopSession : () => startSession()}
          >
            mic {listening ? "on" : "off"}
          </Button>
          <Button color="warning" size="lg" variant="shadow" onPress={reset}>
            reset
          </Button>
          <Button
            isIconOnly
            size="lg"
            variant="shadow"
            onPress={onSettingsOpen}
          >
            <IoSettingsSharp />
          </Button>
        </ButtonGroup>
        <Modal
          isOpen={isSettingsOpen}
          size="2xl"
          onOpenChange={onSettingsOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Settings
                </ModalHeader>
                <ModalBody>
                  <CheckboxGroup
                    value={settings.operationsUsed}
                    onValueChange={(value: string[]) =>
                      setSettings({
                        ...settings,
                        operationsUsed: value,
                      })
                    }
                  >
                    <Checkbox value="add">Addition</Checkbox>
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
                    <Checkbox value="subtract">Subtraction</Checkbox>
                    <p>&emsp; &emsp;Addition problems in reverse.</p>
                    <Checkbox value="multiply">Multiplication</Checkbox>
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
                    <Checkbox value="divide">Division</Checkbox>
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
        <p className="text-8xl font-bold">{randomNum.question}</p>
        {elapsed > 0 ? (
          <Input
            ref={inputRef}
            autoFocus
            aria-label="Enter your answer here"
            isDisabled={!listening}
            placeholder="Answer"
            value={value}
            onValueChange={setValue}
          />
        ) : (
          <></>
        )}

        <p className="text-xl max-w-96">{transcript}</p>
      </div>
    </div>
  );
};

export default SpeechToText;
