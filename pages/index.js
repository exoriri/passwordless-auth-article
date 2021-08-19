import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from '../firebase';
import styles from './index.module.css';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setSending] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        setSending(true);
        e.preventDefault();
        try {
            await firebase.auth().sendSignInLinkToEmail(email, {
              url: `${window.location.origin}/dashboard`,
              handleCodeInApp: true
            });
            window.localStorage.setItem('email', email);
            setMessage('Ссылка для входа отправлена на почту');
            setSending(false);
        } catch(e) {
            setSending(false);
            setMessage('п*дц, ощибка глянь в консоль');
            console.log('error', e);
        }
    }

    useEffect(() => {
        if (window.localStorage.getItem('token')) {
            router.push('/dashboard');
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input 
                    className={styles.textField} 
                    type="text" 
                    name="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <button className={styles.signInBtn} type="submit">
                    {!isSending ? 'Отправить ссылку для входа' : 'Отправляем ссылку для входа'}
                </button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Auth;