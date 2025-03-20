
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
    const newValue = e.target.value;
    const formattedValue = formatTimeInput(newValue);
    setInputValue(formattedValue);
    onChange(formattedValue);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (required && inputValue === '') {
      setIsValid(false);
    } else if (inputValue !== '' && !isValidTimeFormat(inputValue)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1 text-foreground"
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <input
        id={id}
        type="text"
        placeholder="HH:MM"
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className={`form-input ${
          !isValid ? "border-destructive focus:ring-destructive/20" : ""
        } ${isFocused ? "ring-2 ring-primary/10" : ""}`}
        maxLength={5}
      />
      {!isValid && (
        <p className="text-destructive text-xs mt-1">
          Formato inválido. Use HH:MM (ex: 14:30)
        </p>
      )}
    </div>
  );
};

export default TimeInput;
