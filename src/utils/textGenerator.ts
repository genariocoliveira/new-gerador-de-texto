
interface TripOccurrence {
  carNumber: string;
  carTime: string;
  carLine: string;
  tripDate: string;
  rescueCar: string;
  driver: string;
  ccoDuty: string;
  callTime: string;
  rescueDepartureTime: string;
  arrivalAtLocation: string;
  sosReason: string;
  sosLocationCity: string;
  carChangeRequired: string;
  returnTime: string;
  garageArrivalTime: string;
  problemSolution: string;
  totalTime: string;
}

interface GarageOccurrence {
  carNumber: string;
  carTime: string;
  carLine: string;
  tripDate: string;
  driver: string;
  ccoDuty: string;
  entryTime: string;
  exitTime: string;
  entryReason: string;
  carChangeRequired: string;
  problemSolution: string;
  totalTime: string;
}

export const generateTripText = (data: TripOccurrence): string => {
  return `Informo que o carro ${data.carNumber}, horário ${data.carTime}, linha ${data.carLine}, 
do dia ${data.tripDate}, foi socorrido com o carro ${data.rescueCar}. Segue abaixo as informações:
- Motorista: ${data.driver}
- Plantão CCO: ${data.ccoDuty}
- Horário do Chamado: ${data.callTime}
- Horário da Saída do Socorro: ${data.rescueDepartureTime}
- Chegado no Local: ${data.arrivalAtLocation}
- Motivo do SOS: ${data.sosReason}
- Local: ${data.sosLocationCity}
- Houve Troca do Carro? ${data.carChangeRequired}
- Horário de Retorno: ${data.returnTime}
- Horário de Chegada na Garagem: ${data.garageArrivalTime}
- Solução: ${data.problemSolution}
- Tempo total da ocorrência: ${data.totalTime}`;
};

export const generateGarageText = (data: GarageOccurrence): string => {
  return `Informo que o carro ${data.carNumber}, horário ${data.carTime}, linha ${data.carLine}, 
do dia ${data.tripDate}, deu entrada na garagem de Iguatu com o problema abaixo. Segue as informações:
- Motorista: ${data.driver}
- Plantão CCO: ${data.ccoDuty}
- Horário da Entrada: ${data.entryTime}
- Horário da Saída: ${data.exitTime}
- Motivo da Entrada: ${data.entryReason}
- Houve Troca do Carro? ${data.carChangeRequired}
- Solução: ${data.problemSolution}
- Tempo total da ocorrência na garagem: ${data.totalTime}`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy text to clipboard:', error);
    return false;
  }
};
