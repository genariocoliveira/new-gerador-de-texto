export const formatTimeInput = (value: string): string => {
  if (!value) return '';

  // Remove all non-digits and colons
  const cleanValue = value.replace(/[^\d:]/g, '');
  
  if (cleanValue.includes(':')) {
    const [hours, minutesPart] = cleanValue.split(':');
    
    // Handle hours
    if (hours.length > 0) {
      const hoursNum = Math.min(parseInt(hours, 10), 23);
      const formattedHours = hoursNum.toString().padStart(2, '0');
      
      // Return just hours with colon if no minutes yet
      if (!minutesPart) {
        return `${formattedHours}:`;
      }
      
      // Keep original minutes input
      return `${formattedHours}:${minutesPart.slice(0, 2)}`;
    }
    return '';
  }
  
  // Handle input without colon
  if (cleanValue.length <= 2) {
    const hoursNum = Math.min(parseInt(cleanValue || '0', 10), 23);
    return hoursNum.toString().padStart(2, '0');
  }
  
  const hoursNum = Math.min(parseInt(cleanValue.slice(0, 2), 10), 23);
  return `${hoursNum.toString().padStart(2, '0')}:${cleanValue.slice(2, 4)}`;
};

export const formatDateInput = (value: string): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');
  
  if (digits.length <= 2) {
    return digits;
  }
  
  if (digits.length <= 4) {
    return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
  }
  
  // Format as DD/MM/YYYY
  return `${digits.substring(0, 2)}/${digits.substring(2, 4)}/${digits.substring(4, 8)}`;
};

export const calculateTimeDifference = (startTime: string, endTime: string): string => {
  if (!startTime || !endTime) {
    return '';
  }
  
  try {
    // Parse times (assuming format is HH:MM)
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    // Calculate total minutes for both times
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    
    // Calculate the difference in minutes
    let diffMinutes = endTotalMinutes - startTotalMinutes;
    
    // If end time is earlier than start time, assume it's the next day
    if (diffMinutes < 0) {
      diffMinutes += 24 * 60;
    }
    
    // Convert back to hours and minutes
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    if (hours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  } catch (e) {
    console.error('Error calculating time difference:', e);
    return '';
  }
};

export const isValidTimeFormat = (time: string): boolean => {
  if (!time) return false;
  
  // Check if time matches HH:MM format
  const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(time);
};

export const isValidDateFormat = (date: string): boolean => {
  if (!date) return false;
  
  // Check if date matches DD/MM/YYYY format
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return regex.test(date);
};
