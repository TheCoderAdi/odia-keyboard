"use client";
import { useRef, useState } from "react";
import { vowels, consonants, matras, conjuncts, boxArray } from "@/utils/utils";
import Box from "@/components/Box";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 w-full">
      <h1 className="text-4xl font-bold mb-8 text-center max-md:text-2xl max-md:mb-4">Odia Keyboard</h1>

      <div className="flex w-full max-w-6xl space-x-8 max-md:flex-col max-md:justify-center max-md:items-center">
        <div className="flex flex-col w-1/2 sticky max-md:relative top-8 max-md:w-full max-md:mb-20">
          <textarea
            value={text}
            ref={textAreaRef}
            onChange={(e) => setText(e.target.value)}
            rows="10"
            className="w-full p-4 mb-6 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none text-2xl focus:ring-2 focus:ring-indigo-500"
            placeholder="Type here or use the keyboard below..."
          />
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="w-[30%] max-md:w-full text-black p-6 font-bold"
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}

