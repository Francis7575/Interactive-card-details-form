import { useState, ChangeEvent } from "react";
import styles from './Form.module.css'

type Error = {
  message: string;
  fieldName: string;
};

const InputWithError: React.FC<{
  value: number | string;
  id: string;
  maxLength?: number,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  error: Error | undefined;
  type: string;
  onFocus: (fieldName: string) => void;
  fieldName: string;
}> = ({ id, value, onChange, name, placeholder, error, type, onFocus, fieldName, maxLength }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const handleFocus = () => {
    setIsFocused(true)
    onFocus(fieldName);
  }
  const errorClassName = error ? styles.inputError : '';

  return (
    <div className={styles.inputContainer}>
      <input
        id={id}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        maxLength={maxLength}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`${styles.input} ${errorClassName} ${isFocused ? styles.focused : ''}`}
      />
      {error && error.fieldName === name && (
        <div className={styles.errorContainer}>
          <span className={styles.errorMessage}>{error.message}</span>
        </div>
      )}
    </div>
  );
};

export default InputWithError;