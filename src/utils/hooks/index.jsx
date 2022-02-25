import {useState, useEffect} from 'react'

export const useDate = () => {
    const locale = 'en'
    const [today, setDate]= useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 15*1000);
        return () => {
            clearInterval(timer);
        }
    }, []);

    const day = today.toLocaleDateString(locale, {weekday: 'short'});
    const month = today.toLocaleDateString(locale, {month: 'short'});
    const date = `${day}. ${today.getDate()} ${month}.`;

    const time = today.toLocaleTimeString(locale, {hour: 'numeric', hour12:false, minute:'numeric'});

    return{
        date,
        time
    }
}
