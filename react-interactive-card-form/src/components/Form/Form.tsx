import styles from './Form.module.css';
import SecondScreen from '../SecondScreen/SecondScreen';
import { useState, ChangeEvent } from 'react';
import InputWithErrors from './InputWithErrors';

type Props = {
    defaultFormValues: FormData;
    formValues: FormData;
    onFormChange: (data: FormData) => void;
};

export type FormData = {
    cardholderName: string;
    cardNumber: number | string;
    month: number | string;
    year: number | string;
    cvc: number | string;
};

type Error = {
    fieldName: string;
    message: string;
};

const Form = ({ formValues, onFormChange }: Props) => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>(formValues);
    const [errors, setErrors] = useState<Error[]>([]);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'cardNumber') {
            formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: formattedValue,
        }));
        onFormChange({ ...formData, [name]: formattedValue });
    };

    const validateField = (fieldName: keyof FormData, value: string | number): Error | null => {
        if (value === '') {
            return { fieldName, message: "Can't be blank" };
        }
        return null;
    };

    const handleFormSubmission = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Error[] = [];

        Object.entries(formData).forEach(([fieldName, value]) => {
            const error = validateField(fieldName as keyof FormData, value);
            if (error !== null) {
                newErrors.push(error);
            } else if (fieldName === 'cardNumber' && typeof value === 'string' && !/^\d+(\s\d{4})+$/.test(value)) {
                newErrors.push({ fieldName: 'cardNumber', message: 'Wrong format, numbers only' });
            }
        });
        setErrors(newErrors);

        if (newErrors.length === 0) {
            setIsSubmitted(true);
        }
    };

    const clearErrors = (fieldName: string) => {
        setErrors(prevErrors => prevErrors.filter(error => error.fieldName !== fieldName));
    };

    return (
        <>
            <div className={styles.formWrap}>
                {!isSubmitted && (
                    <form id={styles.paymentForm} onSubmit={handleFormSubmission}>
                        <fieldset className={styles.firstTwoFieldsets}>
                            <label htmlFor="cardholderName">Cardholder Name</label>
                            <InputWithErrors
                                value={formData.cardholderName}
                                id={styles.cardholderName}
                                name="cardholderName"
                                type="text"
                                onChange={handleInputChange}
                                onFocus={clearErrors}
                                placeholder="e.g. Jane Appleseed"
                                fieldName='cardholderName'
                                error={errors.find(error => error.fieldName === 'cardholderName')}
                                maxLength={25}
                            />
                        </fieldset>

                        <fieldset className={styles.firstTwoFieldsets}>
                            <label htmlFor="cardNumber">Card Number</label>
                            <InputWithErrors
                                value={formData.cardNumber}
                                id={styles.cardNumber}
                                name="cardNumber"
                                type="text"
                                onChange={handleInputChange}
                                onFocus={clearErrors}
                                placeholder="e.g. 1234 5678 9123 0000"
                                fieldName='cardNumber'
                                error={errors.find(error => error.fieldName === 'cardNumber')}
                                maxLength={19}
                            />
                        </fieldset>

                        <section className={styles.backCardSection}>
                            <fieldset className={styles.backCardFieldset}>
                                <label htmlFor="dateInfo">Exp. Date (MM/YY)</label>
                                <div className={styles.dateInfo}>
                                    <InputWithErrors
                                        value={formData.month}
                                        id={styles.month}
                                        name="month"
                                        type="text"
                                        placeholder="MM"
                                        onFocus={clearErrors}
                                        onChange={handleInputChange}
                                        fieldName='month'
                                        error={errors.find(error => error.fieldName === 'month')}
                                        maxLength={2}
                                    />
                                    <InputWithErrors
                                        value={formData.year}
                                        id={styles.year}
                                        name="year"
                                        type="text"
                                        placeholder="YY"
                                        onFocus={clearErrors}
                                        onChange={handleInputChange}
                                        fieldName='year'
                                        error={errors.find(error => error.fieldName === 'year')}
                                        maxLength={2}
                                    />
                                </div>
                            </fieldset>

                            <fieldset>
                                <div className={styles.cvcContainer}>
                                    <label htmlFor="cvc">CVC</label>
                                    <InputWithErrors
                                        value={formData.cvc}
                                        id={styles.cvc}
                                        name="cvc"
                                        type="text"
                                        placeholder='e.g. 123'
                                        onChange={handleInputChange}
                                        onFocus={clearErrors}
                                        fieldName='cvc'
                                        error={errors.find(error => error.fieldName === 'cvc')}
                                        maxLength={3}
                                    />
                                </div>
                            </fieldset>
                        </section>
                        <button id={styles.button} type='submit'>Confirm</button>
                    </form>
                )}
                {isSubmitted && <SecondScreen />}
            </div>
        </>
    );
};

export default Form;
