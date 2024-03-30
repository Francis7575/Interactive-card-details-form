import styles from './SecondScreen.module.css'
import style from '../Form/Form.module.css'
import completeSvg from '../../assets/icon-complete.svg'

const SecondScreen = () => {
    return (
        <section className={styles.secondScreen}>
            <div>
                <img className={styles.completeImage} src={completeSvg} alt="Complete checkmark" />
                <p className={styles.thankYou}>THANK YOU!</p>
                <p className={styles.paragraph}>
                    We've added your card details
                </p>
            </div>
            <button id={style.button}>Continue</button>
        </section>
    )
}

export default SecondScreen