
import React, { useState } from "react";
import OccurrenceModal from "@/components/OccurrenceModal";
import OccurrenceForm from "@/components/OccurrenceForm";

const Index = () => {
  const [occurrenceType, setOccurrenceType] = useState<"GARAGEM" | "VIAGEM" | null>(null);

  const handleSelectOccurrence = (type: "GARAGEM" | "VIAGEM") => {
    setOccurrenceType(type);
  };

  const handleReset = () => {
    setOccurrenceType(null);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto pt-8 pb-16 px-4">
        {!occurrenceType ? (
          <>
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Sistema de Registro de Ocorrências
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Preencha os dados da ocorrência para gerar um relatório completo e formatado
                automaticamente para compartilhamento.
              </p>
            </div>
            <OccurrenceModal onSelect={handleSelectOccurrence} />
          </>
        ) : (
          <OccurrenceForm type={occurrenceType} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default Index;
