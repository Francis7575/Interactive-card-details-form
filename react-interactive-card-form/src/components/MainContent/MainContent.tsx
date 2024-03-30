import styles from './MainContent.module.css'
import mobileImage from '../../assets/bg-main-mobile.png'
import desktopImage from '../../assets/bg-main-desktop.png'
import cardFront from '../../assets/bg-card-front.png'
import cardBack from '../../assets/bg-card-back.png'
import cardLogo from '../../assets/card-logo.svg'
import Form, { FormData } from '../Form/Form'
import { useState } from 'react'

const MainContent = () => {
    const defaultFormValues: FormData = {
        cardholderName: 'JANE APPLESEED',
        cardNumber: '0000 0000 0000 0000',
        month: '00',
        year: '00',
        cvc: '000'
    }
    const [formValues, setFormValues] = useState<FormData>({
        cardholderName: '',
        cardNumber: '',
        month: '',
        year: '',
        cvc: ''
    });

    const handleFormChange = (data: FormData) => {
        const formattedData = { ...data };
        setFormValues(formattedData);
    };

    return (
        <>
            <main>
                <picture>
                    <img className={styles.mobileImage} src={mobileImage} alt="" />
                    <img className={styles.desktopImage} src={desktopImage} alt="" />
                </picture>
                <div className={styles.mainContainer}>

                    <div className={styles.cardWrap}>
                        <div className={styles.cardContainer}>
                            <img className={styles.cardFront} src={cardFront} alt="Back of card" />
                            <img className={styles.cardBack} src={cardBack} alt="Back of card" />
                            <img className={styles.cardLogo} src={cardLogo} alt="Card Logo" />
                            <span className={styles.cardholderNameValue}>
                                {formValues.cardholderName || defaultFormValues.cardholderName}
                            </span>
                            <span className={styles.cardNumberValue}>
                                {formValues.cardNumber || defaultFormValues.cardNumber}
                            </span>
                            <span className={styles.monthValue}>
                                {(formValues.month || defaultFormValues.month) + " /"}
                            </span>
                            <span className={styles.yearValue}>
                                {formValues.year || defaultFormValues.year}
                            </span>
                            <span className={styles.cvcValue}>
                                {formValues.cvc || defaultFormValues.cvc}
                            </span>
                        </div>
                    </div>
                    <Form defaultFormValues={defaultFormValues}
                        formValues={formValues} onFormChange={handleFormChange}
                    />
                </div>
            </main>
        </>
    )
}

export default MainContent