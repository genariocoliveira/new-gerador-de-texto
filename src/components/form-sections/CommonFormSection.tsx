
import React from "react";
import TimeInput from "../TimeInput";
import DateInput from "../DateInput";

interface CommonFormSectionProps {
  carNumber: string;
  setCarNumber: (value: string) => void;
  carTime: string;
  setCarTime: (value: string) => void;
  carLine: string;
  setCarLine: (value: string) => void;
  tripDate: string;
  setTripDate: (value: string) => void;
  driver: string;
  setDriver: (value: string) => void;
  ccoDuty: string;
  setCcoDuty: (value: string) => void;
}

const CommonFormSection: React.FC<CommonFormSectionProps> = ({
  carNumber,
  setCarNumber,
  carTime,
  setCarTime,
  carLine,
  setCarLine,
  tripDate,
  setTripDate,
  driver,
  setDriver,
  ccoDuty,
  setCcoDuty
}) => {
  return (
    <section>
      <div className="chip mb-4">Informações do Carro</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        <div className="mb-4">
          <label htmlFor="carNumber" className="block text-sm font-medium mb-1 text-foreground">
            Número do Carro <span className="text-destructive">*</span>
          </label>
          <input
            id="carNumber"
            type="text"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
            className="form-input"
            placeholder="Ex: 1234"
            required
          />
        </div>
        
        <TimeInput
          id="carTime"
          label="Horário do Carro"
          value={carTime}
          onChange={setCarTime}
          required
        />
        
        <div className="mb-4">
          <label htmlFor="carLine" className="block text-sm font-medium mb-1 text-foreground">
            Linha do Carro <span className="text-destructive">*</span>
          </label>
          <input
            id="carLine"
            type="text"
            value={carLine}
            onChange={(e) => setCarLine(e.target.value)}
            className="form-input"
            placeholder="Ex: IAU X FOR"
            required
          />
        </div>
        
        <DateInput
          id="tripDate"
          label="Data da Viagem"
          value={tripDate}
          onChange={setTripDate}
          required
        />
        
        <div className="mb-4">
          <label htmlFor="driver" className="block text-sm font-medium mb-1 text-foreground">
            Motorista <span className="text-destructive">*</span>
          </label>
          <input
            id="driver"
            type="text"
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
            className="form-input"
            placeholder="Nome do motorista"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="ccoDuty" className="block text-sm font-medium mb-1 text-foreground">
            Plantão CCO <span className="text-destructive">*</span>
          </label>
          <input
            id="ccoDuty"
            type="text"
            value={ccoDuty}
            onChange={(e) => setCcoDuty(e.target.value)}
            className="form-input"
            placeholder="Nome do plantonista"
            required
          />
        </div>
      </div>
    </section>
  );
};

export default CommonFormSection;
