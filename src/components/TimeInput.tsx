
import React, { useState, useEffect } from "react";
import { formatTimeInput, isValidTimeFormat } from "../utils/timeUtils";

interface TimeInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const TimeInput: React.FC<TimeInputProps> = ({
  id,
  label,
  value,
  onChange,
  required = false,
}) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // Only allow digits and one colon
    newValue = newValue.replace(/[^\d:]/g, '');

    // Handle backspace and deletion
    if (newValue.length < inputValue.length) {
      setInputValue(newValue);
      onChange(newValue);
      return;
    }

    if (newValue.includes(':')) {
      const [hours, minutes] = newValue.split(':');

      // Keep original input for editing
      if (hours.length <= 2 && (!minutes || minutes.length <= 2)) {
        setInputValue(newValue);
        onChange(newValue);
        return;
      }
    } else if (newValue.length <= 2) {
      setInputValue(newValue);
      onChange(newValue);
      return;
    } else {
      // Auto-add colon after 2 digits
      newValue = `${newValue.slice(0, 2)}:${newValue.slice(2, 4)}`;
    }

    setInputValue(newValue);
    onChange(newValue);
  };

  const handleBlur = () => {
    setIsFocused(false);

    // Only format if input is complete
    if (inputValue && inputValue.includes(':')) {
      const [hours, minutes] = inputValue.split(':');
      if (hours && minutes && minutes.length === 2) {
        const hoursNum = Math.min(parseInt(hours, 10), 23);
        const minutesNum = Math.min(parseInt(minutes, 10), 59);
        if (!isNaN(hoursNum) && !isNaN(minutesNum)) {
          const formattedTime = `${hoursNum.toString().padStart(2, '0')}:${minutesNum.toString().padStart(2, '0')}`;
          setInputValue(formattedTime);
          onChange(formattedTime);
        }
      }
    }

    // Validate
    if (required && !inputValue) {
      setIsValid(false);
    } else if (inputValue && !isValidTimeFormat(inputValue)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  // ... rest of the component remains the same ...

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        type="text"
        placeholder="HH:MM"
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className={`
          w-full
          rounded-lg
          border-2
          bg-white
          dark:bg-gray-900
          px-4
          py-2.5
          text-sm
          font-medium
          transition-all
          duration-200
          placeholder:text-gray-400
          dark:placeholder:text-gray-500
          ${!isValid
            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
            : "border-gray-200 dark:border-gray-700 focus:border-blue-500 hover:border-gray-300 dark:hover:border-gray-600"
          }
          ${isFocused
            ? "ring-4 ring-blue-100 dark:ring-blue-900/30"
            : ""
          }
          focus:outline-none
        `}
        maxLength={5}
      />
      {!isValid && (
        <p className="mt-2 text-sm text-red-500">
          Formato inválido. Use HH:MM (ex: 14:30)
        </p>
      )}
    </div>
  );
};

export default TimeInput;
