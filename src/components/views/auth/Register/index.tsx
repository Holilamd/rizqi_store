import styles from './Register.module.scss'
const RegisterView = () => {
    return (
        <div className={styles.register}>
            <h1 className={styles.register__title}>Register</h1>
            <div className={styles.register__form}>
                <form action="">
                    <div className={styles.register__form__item}>
                        <label htmlFor="">FullName</label>
                        <input type="text" className={styles.register__form__item__input} />
                    </div>
                    <button className={styles.register__form__item__button}>
                        Register
                    </button>
                </form>
            </div>
            <p>
                Have an account? Sign In here
            </p>
        </div>
    );
};
export default RegisterView;