
import React from "react";
import TimeInput from "../TimeInput";

interface TripFormSectionProps {
  rescueCar: string;
  setRescueCar: (value: string) => void;
  callTime: string;
  setCallTime: (value: string) => void;
  rescueDepartureTime: string;
  setRescueDepartureTime: (value: string) => void;
  arrivalAtLocation: string;
  setArrivalAtLocation: (value: string) => void;
  sosReason: string;
  setSosReason: (value: string) => void;
  sosLocationCity: string;
  setSosLocationCity: (value: string) => void;
  carChangeRequired: string;
  setCarChangeRequired: (value: string) => void;
  returnTime: string;
  setReturnTime: (value: string) => void;
  garageArrivalTime: string;
  setGarageArrivalTime: (value: string) => void;
}

const TripFormSection: React.FC<TripFormSectionProps> = ({
  rescueCar,
  setRescueCar,
  callTime,
  setCallTime,
  rescueDepartureTime,
  setRescueDepartureTime,
  arrivalAtLocation,
  setArrivalAtLocation,
  sosReason,
  setSosReason,
  sosLocationCity,
  setSosLocationCity,
  carChangeRequired,
  setCarChangeRequired,
  returnTime,
  setReturnTime,
  garageArrivalTime,
  setGarageArrivalTime
}) => {
  return (
    <section>
      <div className="chip mb-4">Informações do Socorro</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        <div className="mb-4">
          <label htmlFor="rescueCar" className="block text-sm font-medium mb-1 text-foreground">
            Carro de Socorro <span className="text-destructive">*</span>
          </label>
          <input
            id="rescueCar"
            type="text"
            value={rescueCar}
            onChange={(e) => setRescueCar(e.target.value)}
            className="form-input"
            placeholder="Ex: 5678"
            required
          />
        </div>
        
        <TimeInput
          id="callTime"
          label="Horário do Chamado"
          value={callTime}
          onChange={setCallTime}
          required
        />
        
        <TimeInput
          id="rescueDepartureTime"
          label="Horário da Saída do Socorro"
          value={rescueDepartureTime}
          onChange={setRescueDepartureTime}
          required
        />
        
        <TimeInput
          id="arrivalAtLocation"
          label="Chegada no Local"
          value={arrivalAtLocation}
          onChange={setArrivalAtLocation}
          required
        />
        
        <div className="mb-4 sm:col-span-2">
          <label htmlFor="sosReason" className="block text-sm font-medium mb-1 text-foreground">
            Motivo do SOS <span className="text-destructive">*</span>
          </label>
          <textarea
            id="sosReason"
            value={sosReason}
            onChange={(e) => setSosReason(e.target.value)}
            className="form-input min-h-[80px]"
            placeholder="Descreva o motivo do SOS"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="sosLocationCity" className="block text-sm font-medium mb-1 text-foreground">
            Cidade Local do SOS <span className="text-destructive">*</span>
          </label>
          <input
            id="sosLocationCity"
            type="text"
            value={sosLocationCity}
            onChange={(e) => setSosLocationCity(e.target.value)}
            className="form-input"
            placeholder="Ex: Fortaleza"
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
        
        <TimeInput
          id="returnTime"
          label="Horário de Retorno"
          value={returnTime}
          onChange={setReturnTime}
          required
        />
        
        <TimeInput
          id="garageArrivalTime"
          label="Horário de Chegada na Garagem"
          value={garageArrivalTime}
          onChange={setGarageArrivalTime}
          required
        />
      </div>
    </section>
  );
};

export default TripFormSection;
