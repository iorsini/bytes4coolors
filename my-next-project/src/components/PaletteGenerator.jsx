import React, { useState, useEffect } from "react";
import { FaLock, FaLockOpen, FaRegCopy } from "react-icons/fa";
import Title from "./Title";

export default function PaletteGenerator() {
const [colors, setColors] = useState(() => {
return [
{ hex: "#ef6351", locked: false },
{ hex: "#f38375", locked: false },
{ hex: "#f7a399", locked: false },
{ hex: "#fbc3bc", locked: false },
{ hex: "#ffe3e0", locked: false },
];
});

const [copiedIndex, setCopiedIndex] = useState(null);

const generateRandomHex = () => {
    const str = "0123456789abcdef";
    let hex = "#";
    
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * 16);
        hex += str[randomIndex];
    }
    return hex;
  };
  
  const generatePalette = () => {
  const newColors = colors.map(color => ({
  hex: color.locked ? color.hex : generateRandomHex(),
  locked: color.locked
}));
  setColors(newColors);
};

const toggleLock = (index) => {
  const newColors = colors.map((color, i) => {
    if (i === index) {
      return { ...color, locked: !color.locked }; // inverte locked
    }
    return color;
  });
  setColors(newColors);
};

const copyToClipboard = (text, index) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1000); // some depois de 1s
    })
    .catch((err) => {
      console.error("Erro ao copiar:", err);
    });
};

useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      generatePalette();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [colors]);

return (
  <main className="flex h-screen">
  <Title />
  {colors.map((color, index) => (
    <div
      key={index}
      className="relative flex-1 flex flex-col items-center justify-center"
      style={{ backgroundColor: color.hex }}
    >
      <p className="text-white font-mono text-lg">{color.hex}</p>
      {/* botão de copy */}
      <button
        onClick={() => copyToClipboard(color.hex, index)}
        className="mt-2 px-3 py-1 bg-white text-black rounded cursor-pointer hover:bg-gray-200"
      >
        <FaRegCopy />
      </button>
      {/* botão de lock */}
      <button
        onClick={() => toggleLock(index)}
        className="mt-2 px-3 py-1 bg-white text-black rounded cursor-pointer hover:bg-gray-200"
      >
        {color.locked ? <FaLock /> : <FaLockOpen />}
      </button>
      {/* popup */}
      <div
        className={`absolute top-4 bg-black/80 text-white px-3 py-1 rounded text-sm shadow-lg transition-opacity duration-500 ${
          copiedIndex === index ? "opacity-100" : "opacity-0"
        }`}
      >
        HEX copiado!
      </div>
    </div>
  ))}
</main>
);
}