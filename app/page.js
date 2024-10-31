"use client";
import { useEffect, useRef, useState } from "react";
import { boxArray, keyToBoxMap } from "@/utils/utils";
import Box from "@/components/Box";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import introJs from "intro.js";
import { steps } from "@/utils/steps";
import KeyBindings from "@/components/shared/KeyBindings";

export default function OdiaKeyboard() {
  const [text, setText] = useState("");
  const [hover, setHover] = useState(false);
  const textAreaRef = useRef(null);
  const { toast } = useToast();

  const handleLetterClick = (letter) => {
    const textArea = textAreaRef.current;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;

    const updatedText = text.slice(0, start) + letter + text.slice(end);
    setText(updatedText);

    textArea.focus();

    setTimeout(() => {
      textArea.selectionStart = textArea.selectionEnd = start + letter.length;
    }, 0);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    textAreaRef.current.select();
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard",
    });
  };

  useEffect(() => {
    const introShown = localStorage.getItem("introShown");
    if (introShown) return;
    introJs()
      .setOptions({
        steps,
      })
      .start()
      .then(() => {
        localStorage.setItem("introShown", true);
      });
  }, []);

  useEffect(() => {
    const keyDownEvents = (e) => {
      if (keyToBoxMap.hasOwnProperty(e.key)) {
        scrollToTheBox(keyToBoxMap[e.key]);
      }
    };
    const scrollToTheBox = (index) => {
      let selectedBox = document.querySelector(`.box-${index}`);
      if (selectedBox) {
        selectedBox.scrollIntoView({ behavior: "smooth" });
      }
    };

    document.addEventListener("keydown", keyDownEvents);

    return () => {
      document.removeEventListener("keydown", keyDownEvents);
    };
  }, []);

  const saveAsTextFile = () => {
    const currentText = textAreaRef.current.value;

    if (!currentText)
      return toast({
        title: "No text to save",
        description: "Please type something before saving",
      });

    const a = document.createElement("a");
    const file = new Blob([currentText], { type: "text/plain" });
    const date = new Date().getMilliseconds();

    a.href = URL.createObjectURL(file);
    a.download = `${date}-odia-file.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen dark:bg-black relative dark:text-white flex flex-col items-center justify-center p-8 w-full">
      <div className="absolute top-7 left-[10%] tut-question-mark max:md:hidden">
        <KeyBindings hover={hover} setHover={setHover} />
      </div>
      <div className="absolute top-7 right-[10%] tut-theme-change">
        <ThemeToggle />
      </div>
      <h1 className="text-4xl font-bold mb-8 text-center max-md:text-2xl max-md:mb-4">
        Odia Keyboard
      </h1>

      <div className="flex w-full max-w-6xl space-x-8 max-md:flex-col max-md:justify-center max-md:items-center">
        <div className="flex flex-col w-1/2 sticky max-md:relative top-8 max-md:w-full max-md:mb-20">
          <textarea
            value={text}
            ref={textAreaRef}
            onChange={(e) => setText(e.target.value)}
            rows="10"
            className="tut-textarea w-full p-4 mb-6 dark:bg-gray-900 dark:text-white border border-gray-700 dark:border-white rounded-lg focus:outline-none text-2xl focus:ring-2 focus:ring-indigo-500"
            placeholder="Type here or use the keyboard below..."
          />
          <div className="flex gap-3 flex-wrap">
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="tut-copy-button w-[30%] max-md:w-full text-black dark:text-white border-2 p-6 font-bold"
            >
              Copy to clipboard
            </Button>
            <Button
              onClick={saveAsTextFile}
              variant="outline"
              className="tut-copy-button w-[30%] max-md:w-full text-black dark:text-white border-2 p-6 font-bold"
            >
              Save as text file
            </Button>
          </div>
        </div>

        <div className="flex flex-col w-1/2 space-y-6 max-h-[500px] overflow-y-auto max-md:w-full">
          {boxArray.map((box, index) => (
            <Box
              key={`index-${index}-${box.title}`}
              title={box.title}
              letters={box.letters}
              handleLetterClick={handleLetterClick}
              index={index}
              boxLength={boxArray.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
