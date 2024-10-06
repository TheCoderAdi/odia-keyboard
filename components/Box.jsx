import React from "react";

const Box = ({ title, letters, handleLetterClick, boxLength, index }) => {
  return (
    <div
      className={`w-full max-w-2xl ${
        index === boxLength - 1 ? "pb-5" : "mb-5"
      }`}
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="flex flex-wrap justify-center space-x-2 space-y-2 max-md:justify-start">
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className="bg-white hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 text-2xl max-md:text-xl"
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Box;
