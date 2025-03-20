
import React from "react";
import TimeInput from "../TimeInput";

interface GarageFormSectionProps {
  entryTime: string;
  setEntryTime: (value: string) => void;
  exitTime: string;
  setExitTime: (value: string) => void;
  entryReason: string;
  setEntryReason: (value: string) => void;
  carChangeRequired: string;
  setCarChangeRequired: (value: string) => void;
}

const GarageFormSection: React.FC<GarageFormSectionProps> = ({
  entryTime,
  setEntryTime,
  exitTime,
  setExitTime,
  entryReason,
  setEntryReason,
  carChangeRequired,
  setCarChangeRequired
}) => {
  return (
    <section>
      <div className="chip mb-4">Informações da Entrada</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        <TimeInput
          id="entryTime"
          label="Horário da Entrada"
          value={entryTime}
          onChange={setEntryTime}
          required
        />
        
        <TimeInput
          id="exitTime"
          label="Horário da Saída"
          value={exitTime}
          onChange={setExitTime}
          required
        />
        
        <div className="mb-4 sm:col-span-2">
          <label htmlFor="entryReason" className="block text-sm font-medium mb-1 text-foreground">
            Motivo da Entrada <span className="text-destructive">*</span>
          </label>
          <textarea
            id="entryReason"
            value={entryReason}
            onChange={(e) => setEntryReason(e.target.value)}
            className="form-input min-h-[80px]"
            placeholder="Descreva o motivo da entrada na garagem"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-foreground">
            Troca do Carro? <span className="text-destructive">*</span>
          </label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="carChangeRequired"
                value="SIM"
                checked={carChangeRequired === "SIM"}
                onChange={() => setCarChangeRequired("SIM")}
                className="mr-2"
              />
              <span>Sim</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                name="carChangeRequired"
                value="NÃO"
                checked={carChangeRequired === "NÃO"}
                onChange={() => setCarChangeRequired("NÃO")}
                className="mr-2"
              />
              <span>Não</span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GarageFormSection;
