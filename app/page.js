"use client";
import { useEffect, useRef, useState } from "react";
import { boxArray } from "@/utils/utils";
import Box from "@/components/Box";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import introJs from "intro.js";

export default function OdiaKeyboard() {
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);
  const { toast } = useToast();

  const handleLetterClick = (letter) => {
    const textArea = textAreaRef.current;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;

    const updatedText = text.slice(0, start) + letter + text.slice(end);
    setText(updatedText);

    if (window.innerWidth < 768) {
      textArea.focus();
    }

    setTimeout(() => {
      textArea.selectionStart = textArea.selectionEnd = start + letter.length;
    }, 0);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard",
    });
  };

  useEffect(() => {
    const introShown = localStorage.getItem('introShown');
    if (introShown) return;
    introJs().setOptions({
      steps: [
        {
          element: '.tut-theme-change',
          intro: 'This is your theme toggle button!',
          position: 'right',
          tooltipClass: "dark:bg-black dark:text-white",
        },
        {
          element: '.tut-textarea',
          intro: 'This is your text area where you can type or paste text.',
          position: 'bottom',
          tooltipClass: "dark:bg-black dark:text-white",
        }, {
          element: '.tut-copy-button',
          intro: 'Click here to copy the text to your clipboard',
          position: 'left',
          tooltipClass: "dark:bg-black dark:text-white",
        },
        {
          element: '.box-0',
          intro: 'These are the vowels. Click on them to type them in the text area.',
          position: 'right',
          tooltipClass: "dark:bg-black dark:text-white"
        },
        {
          element: '.box-1',
          intro: 'These are the consonants. Click on them to type them in the text area.',
          position: 'right',
          tooltipClass: "dark:bg-black dark:text-white"
        },
        {
          element: '.box-2',
          intro: 'These are the special Matras. Click on them to type them in the text area.',
          position: 'right',
          tooltipClass: "dark:bg-black dark:text-white"
        },
        {
          element: '.box-3',
          intro: 'These are the conjucts. Click on them to type them in the text area.',
          position: 'right',
          tooltipClass: "dark:bg-black dark:text-white"
        }
      ]
    }).start().then(() => {
      localStorage.setItem('introShown', true);
    })
  }, []);

  return (
    <div className="min-h-screen dark:bg-black relative dark:text-white flex flex-col items-center justify-center p-8 w-full">
      <div className="absolute top-7 right-[10%] tut-theme-change">
        <ThemeToggle />
      </div>
      <h1 className="text-4xl font-bold mb-8 text-center max-md:text-2xl max-md:mb-4">Odia Keyboard</h1>

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
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="tut-copy-button w-[30%] max-md:w-full text-black dark:text-white border-2 p-6 font-bold"
          >
            Copy to clipboard
          </Button>
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

