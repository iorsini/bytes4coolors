import React, { useState, useEffect } from "react";


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
    {colors.map((color, index) => (
      <div
        key={index} // cada bloco precisa de uma chave única
        className="flex-1 flex flex-col items-center justify-center"
        style={{ backgroundColor: color.hex }} // cor de fundo
      >
        {/* mostra o hex da cor */}
        <p className="text-white font-mono text-lg">{color.hex}</p>

        {/* botão de lock */}
        <button
          onClick={() => toggleLock(index)} // chama função passando o índice
          className="mt-2 px-3 py-1 bg-white text-black rounded"
        >
          {color.locked ? "🔒" : "🔓"} {/* muda ícone conforme locked */}
        </button>
      </div>
    ))}
  </main>
);
}