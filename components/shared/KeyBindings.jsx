import { keyToBoxMapName } from "@/utils/utils";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import React from "react";

const KeyBindings = ({ hover, setHover }) => {
  return (
    <div className="relative">
      <QuestionMarkCircledIcon
        className="cursor-pointer size-7 hover:scale-110 ease-in-out duration-200"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
      {hover && (
        <div className="absolute top-7 left-[10%] tut-theme-change z-50 dark:bg-black bg-white p-3 rounded-lg shadow-sm dark:shadow-white shadow-black">
          {Object.entries(keyToBoxMapName).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-2">
                {key}
              </span>
              <span className="text-sm">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KeyBindings;
