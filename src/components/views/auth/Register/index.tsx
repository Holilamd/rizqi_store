import Link from 'next/link';
import styles from './Register.module.scss'
import { useRouter } from 'next/router';
import { FormEvent, use, useState } from 'react';
const RegisterView = () => {
    const { push } = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement >) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        const form = event.target as HTMLFormElement;
        const data = {
            fullname: form.fullname.value,
            email: form.email.value,
            phone: form.phone.value,
            password: form.password.value
        }
        const response = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.status === 200) {
            form.reset();
            setIsLoading(false);
            push('/auth/login');
        } else{
            setIsLoading(false);
            setError('Email is already registered');
        }

    };

    return (
        <div className={styles.register}>
            <h1 className={styles.register__title}>Register</h1>
            {error && <p className={styles.register__error}>{error}</p>}
            <div className={styles.register__form}>
                <form onSubmit={handleSubmit}>
                <div className={styles.register__form__item}>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="fullname">FullName</label>
                        <input 
                            type="text"
                            name="fullname"
                            id="fullname" 
                            className={styles.register__form__item__input} />
                    </div>
                    
                    <div className={styles.register__form__item}>
                        <label htmlFor="phone">Phone</label>
                        <input 
                            type="text" 
                            name="phone" 
                            id="phone" 
                            className={styles.register__form__item__input} /> 
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            className={styles.register__form__item__input} />
                    </div>
                    <button type="submit" className={styles.register__form__item__button}>
                        {isLoading ? 'Loading...' : 'Register'}
                    </button>
                </form>
            </div>
            <p className={styles.register__link}>
                Have an account? Sign In <Link href="/auth/login">here</Link>
            </p>
        </div>
    );
}
export default RegisterView;
