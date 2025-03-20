
import React from "react";

interface FormActionsProps {
  onGenerateText: () => void;
  onClearFields: () => void;
  onReset: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
  onGenerateText,
  onClearFields,
  onReset
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <button
        onClick={onGenerateText}
        className="btn-primary flex-1 flex items-center justify-center"
      >
        GERAR TEXTO
      </button>
      
      <button onClick={onClearFields} className="btn-secondary flex-1">
        LIMPAR CAMPOS
      </button>
      
      <button onClick={onReset} className="btn-secondary flex-1">
        VOLTAR
      </button>
    </div>
  );
};

export default FormActions;
