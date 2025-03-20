
import React, { useState, useEffect } from "react";
import TimeInput from "./TimeInput";
import DateInput from "./DateInput";
import Toast from "./Toast";
import { calculateTimeDifference } from "../utils/timeUtils";
import { copyToClipboard, generateGarageText, generateTripText } from "../utils/textGenerator";

interface OccurrenceFormProps {
  type: "GARAGEM" | "VIAGEM";
  onReset: () => void;
}

const OccurrenceForm: React.FC<OccurrenceFormProps> = ({ type, onReset }) => {
  // Common fields
  const [carNumber, setCarNumber] = useState<string>("");
  const [carTime, setCarTime] = useState<string>("");
  const [carLine, setCarLine] = useState<string>("");
  const [tripDate, setTripDate] = useState<string>("");
  const [driver, setDriver] = useState<string>("");
  const [ccoDuty, setCcoDuty] = useState<string>("");
  const [carChangeRequired, setCarChangeRequired] = useState<string>("NÃO");
  const [problemSolution, setProblemSolution] = useState<string>("");
  
  // Trip specific fields
  const [rescueCar, setRescueCar] = useState<string>("");
  const [callTime, setCallTime] = useState<string>("");
  const [rescueDepartureTime, setRescueDepartureTime] = useState<string>("");
  const [arrivalAtLocation, setArrivalAtLocation] = useState<string>("");
  const [sosReason, setSosReason] = useState<string>("");
  const [sosLocationCity, setSosLocationCity] = useState<string>("");
  const [returnTime, setReturnTime] = useState<string>("");
  const [garageArrivalTime, setGarageArrivalTime] = useState<string>("");
  
  // Garage specific fields
  const [entryTime, setEntryTime] = useState<string>("");
  const [exitTime, setExitTime] = useState<string>("");
  const [entryReason, setEntryReason] = useState<string>("");
  
  // Toast state
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: "success" | "error" | "info" }>({
    visible: false,
    message: "",
    type: "success",
  });
  
  // Calculated total time
  const [totalTime, setTotalTime] = useState<string>("");
  
  // Calculate total time when relevant times change
  useEffect(() => {
    if (type === "VIAGEM" && callTime && garageArrivalTime) {
      setTotalTime(calculateTimeDifference(callTime, garageArrivalTime));
    } else if (type === "GARAGEM" && entryTime && exitTime) {
      setTotalTime(calculateTimeDifference(entryTime, exitTime));
    }
  }, [type, callTime, garageArrivalTime, entryTime, exitTime]);
  
  // Validate required fields
  const validateFields = (): boolean => {
    // Common required fields
    if (!carNumber || !carTime || !carLine || !tripDate) {
      showToast("Preencha todos os campos obrigatórios", "error");
      return false;
    }
    
    if (type === "VIAGEM") {
      // Trip specific required fields
      if (!rescueCar || !driver || !ccoDuty || !callTime || !rescueDepartureTime || 
          !arrivalAtLocation || !sosReason || !sosLocationCity || !returnTime || 
          !garageArrivalTime || !problemSolution) {
        showToast("Preencha todos os campos obrigatórios", "error");
        return false;
      }
    } else {
      // Garage specific required fields
      if (!driver || !ccoDuty || !entryTime || !exitTime || !entryReason || !problemSolution) {
        showToast("Preencha todos os campos obrigatórios", "error");
        return false;
      }
    }
    
    return true;
  };
  
  const generateText = async () => {
    if (!validateFields()) return;
    
    let text = "";
    
    if (type === "VIAGEM") {
      text = generateTripText({
        carNumber,
        carTime,
        carLine,
        tripDate,
        rescueCar,
        driver,
        ccoDuty,
        callTime,
        rescueDepartureTime,
        arrivalAtLocation,
        sosReason,
        sosLocationCity,
        carChangeRequired,
        returnTime,
        garageArrivalTime,
        problemSolution,
        totalTime,
      });
    } else {
      text = generateGarageText({
        carNumber,
        carTime,
        carLine,
        tripDate,
        driver,
        ccoDuty,
        entryTime,
        exitTime,
        entryReason,
        carChangeRequired,
        problemSolution,
        totalTime,
      });
    }
    
    const copied = await copyToClipboard(text);
    
    if (copied) {
      showToast("Texto copiado para a área de transferência!", "success");
    } else {
      showToast("Erro ao copiar texto", "error");
    }
  };
  
  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({
      visible: true,
      message,
      type,
    });
  };
  
  const hideToast = () => {
    setToast({
      ...toast,
      visible: false,
    });
  };
  
  const clearAllFields = () => {
    // Clear common fields
    setCarNumber("");
    setCarTime("");
    setCarLine("");
    setTripDate("");
    setDriver("");
    setCcoDuty("");
    setCarChangeRequired("NÃO");
    setProblemSolution("");
    
    // Clear trip specific fields
    setRescueCar("");
    setCallTime("");
    setRescueDepartureTime("");
    setArrivalAtLocation("");
    setSosReason("");
    setSosLocationCity("");
    setReturnTime("");
    setGarageArrivalTime("");
    
    // Clear garage specific fields
    setEntryTime("");
    setExitTime("");
    setEntryReason("");
    
    // Reset total time
    setTotalTime("");
    
    // Show confirmation toast
    showToast("Campos limpos com sucesso", "info");
  };
  
  return (
    <div className="animate-fade-in w-full max-w-3xl mx-auto min-h-screen sm:min-h-fit sm:p-6">
      <div className="bg-white/80 w-full h-full backdrop-blur-sm sm:rounded-2xl shadow-subtle border-0 sm:border border-border p-4 sm:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{type === "VIAGEM" ? "Ocorrência em Viagem" : "Ocorrência na Garagem"}</h2>
          <p className="text-muted-foreground">Preencha os dados da ocorrência</p>
        </div>
        
        <div className="space-y-6">
          {/* ... rest of the form content ... */}
          {/* Common Fields Section */}
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
          
          {/* Trip Specific Fields */}
          {type === "VIAGEM" && (
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
          )}
          
          {/* Garage Specific Fields */}
          {type === "GARAGEM" && (
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
          )}
          
          {/* Solution & Time Section */}
          <section>
            <div className="chip mb-4">Solução e Tempo</div>
            <div className="grid grid-cols-1 gap-x-6">
              <div className="mb-4">
                <label htmlFor="problemSolution" className="block text-sm font-medium mb-1 text-foreground">
                  Solução do Problema <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="problemSolution"
                  value={problemSolution}
                  onChange={(e) => setProblemSolution(e.target.value)}
                  className="form-input min-h-[80px]"
                  placeholder="Descreva a solução aplicada ao problema"
                  required
                />
              </div>
              
              {totalTime && (
                <div className="mb-6 p-4 bg-secondary/50 rounded-lg border border-border">
                  <p className="font-medium">Tempo total da ocorrência:</p>
                  <p className="text-xl font-bold">{totalTime}</p>
                </div>
              )}
            </div>
          </section>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={generateText}
              className="btn-primary flex-1 flex items-center justify-center"
            >
              GERAR TEXTO
            </button>
            
            <button onClick={clearAllFields} className="btn-secondary flex-1">
              LIMPAR CAMPOS
            </button>
            
            <button onClick={onReset} className="btn-secondary flex-1">
              VOLTAR
            </button>
          </div>
        </div>
      </div>
      
      {/* Toast notification */}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
};

export default OccurrenceForm;
