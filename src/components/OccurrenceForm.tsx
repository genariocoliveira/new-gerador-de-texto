
import React, { useState, useEffect } from "react";
import Toast from "./Toast";
import { calculateTimeDifference } from "../utils/timeUtils";
import { copyToClipboard, generateGarageText, generateTripText } from "../utils/textGenerator";
import CommonFormSection from "./form-sections/CommonFormSection";
import TripFormSection from "./form-sections/TripFormSection";
import GarageFormSection from "./form-sections/GarageFormSection";
import SolutionTimeSection from "./form-sections/SolutionTimeSection";
import FormActions from "./form-sections/FormActions";

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
    <div className="animate-fade-in w-full max-w-3xl mx-auto p-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-subtle border border-border p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{type === "VIAGEM" ? "Ocorrência em Viagem" : "Ocorrência na Garagem"}</h2>
          <p className="text-muted-foreground">Preencha os dados da ocorrência</p>
        </div>
        
        <div className="space-y-6">
          {/* Common Fields Section */}
          <CommonFormSection 
            carNumber={carNumber}
            setCarNumber={setCarNumber}
            carTime={carTime}
            setCarTime={setCarTime}
            carLine={carLine}
            setCarLine={setCarLine}
            tripDate={tripDate}
            setTripDate={setTripDate}
            driver={driver}
            setDriver={setDriver}
            ccoDuty={ccoDuty}
            setCcoDuty={setCcoDuty}
          />
          
          {/* Type Specific Fields */}
          {type === "VIAGEM" ? (
            <TripFormSection 
              rescueCar={rescueCar}
              setRescueCar={setRescueCar}
              callTime={callTime}
              setCallTime={setCallTime}
              rescueDepartureTime={rescueDepartureTime}
              setRescueDepartureTime={setRescueDepartureTime}
              arrivalAtLocation={arrivalAtLocation}
              setArrivalAtLocation={setArrivalAtLocation}
              sosReason={sosReason}
              setSosReason={setSosReason}
              sosLocationCity={sosLocationCity}
              setSosLocationCity={setSosLocationCity}
              carChangeRequired={carChangeRequired}
              setCarChangeRequired={setCarChangeRequired}
              returnTime={returnTime}
              setReturnTime={setReturnTime}
              garageArrivalTime={garageArrivalTime}
              setGarageArrivalTime={setGarageArrivalTime}
            />
          ) : (
            <GarageFormSection 
              entryTime={entryTime}
              setEntryTime={setEntryTime}
              exitTime={exitTime}
              setExitTime={setExitTime}
              entryReason={entryReason}
              setEntryReason={setEntryReason}
              carChangeRequired={carChangeRequired}
              setCarChangeRequired={setCarChangeRequired}
            />
          )}
          
          {/* Solution & Time Section */}
          <SolutionTimeSection 
            problemSolution={problemSolution}
            setProblemSolution={setProblemSolution}
            totalTime={totalTime}
          />
          
          {/* Action Buttons */}
          <FormActions 
            onGenerateText={generateText}
            onClearFields={clearAllFields}
            onReset={onReset}
          />
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
