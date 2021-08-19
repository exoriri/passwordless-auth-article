import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import firebase from '../firebase';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const onExit = () => {
        firebase.auth().signOut()
            .then(() => {
                window.localStorage.removeItem('token');
                router.push('/');
            })
            .catch(e => {
                alert(e);
            })
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const apiKey = searchParams.get('apiKey');
        const email = window.localStorage.getItem('email');

        const fbSignIn = async () => {
            const fbResult = await firebase.auth().signInWithEmailLink(email, window.location.href);
            return fbResult;
        };
        
        if (!window.localStorage.getItem('token') && !firebase.auth().currentUser) {
            if (apiKey && firebase.auth().isSignInWithEmailLink(window.location.href)) {
                fbSignIn()
                    .then(async fbResult => {
                        const tokenResult = await fbResult.user.getIdTokenResult();
                        window.localStorage.setItem('token', tokenResult.token);
                        setLoading(false);
                    })
                    .catch(e => {
                        alert(e);
                        router.push('/')
                    })
            } else {
                router.push('/');
            }
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <>
            {loading ? <div>Загрузка...</div> : 
                <div>
                    Вы вошли в личный кабинет
                    <button onClick={onExit}>Выйти</button>
                </div>
            }
        </>
    );
};

export default Dashboard;