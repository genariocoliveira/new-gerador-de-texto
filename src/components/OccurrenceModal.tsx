
import React, { useState } from "react";

interface OccurrenceModalProps {
  onSelect: (type: "GARAGEM" | "VIAGEM") => void;
}

const OccurrenceModal: React.FC<OccurrenceModalProps> = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<"GARAGEM" | "VIAGEM" | null>(null);

  const handleSelect = () => {
    if (selectedOption) {
      onSelect(selectedOption);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md p-8 glass-morphism rounded-xl animate-scale-in shadow-lg mx-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight mb-1">OCORRÊNCIA FOI:</h2>
          <p className="text-muted-foreground">Selecione o tipo de ocorrência</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            className={`flex justify-center items-center p-6 rounded-xl transition-all duration-300 ${
              selectedOption === "GARAGEM"
                ? "bg-primary text-white shadow-md"
                : "bg-secondary/50 hover:bg-secondary text-foreground"
            }`}
            onClick={() => setSelectedOption("GARAGEM")}
          >
            <span className="font-medium">GARAGEM</span>
          </button>
          
          <button
            className={`flex justify-center items-center p-6 rounded-xl transition-all duration-300 ${
              selectedOption === "VIAGEM"
                ? "bg-primary text-white shadow-md"
                : "bg-secondary/50 hover:bg-secondary text-foreground"
            }`}
            onClick={() => setSelectedOption("VIAGEM")}
          >
            <span className="font-medium">VIAGEM</span>
          </button>
        </div>
        
        <button
          className={`w-full btn-primary ${
            !selectedOption ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSelect}
          disabled={!selectedOption}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default OccurrenceModal;
