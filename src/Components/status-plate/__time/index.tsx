import React from 'react';

import { b } from '../index';

const getTimeDifference = (startTime: Date) => new Date().getTime() - startTime.getTime();

const parseTime = (time: number) => {
    const secondsLeft = Math.floor(time / 1000);

    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    return (
        `${hours.toString().padStart(2, '0')}` +
        `:${minutes.toString().padStart(2, '0')}` +
        `:${seconds.toString().padStart(2, '0')}`
    );
};

export const StatusPlateTime = () => {
    // берем время, полученное с бэка и сохранное в стор
    const startTime = new Date('2023-07-28');

    const [time, setTime] = React.useState('--:--:--');

    React.useEffect(() => {
        // setInterval работает не четко за обозначенный интервал
        // (например если js-поток перегружен или пользователь переключился на другую вкладку или закрыл приложение)
        // лучше requestAnimationFrame, все равно каждую секунду обновляемся
        const interval: ReturnType<typeof setInterval> = setInterval(() => {
            const timeDiff = getTimeDifference(startTime);

            if (timeDiff > 0) {
                // остановить квест, редиректнуть на конец квеста и перезапросить с бэка статус
                setTime(parseTime(0));
                return clearInterval(interval);
            }

            // берем минус, чтобы показывать нормальный таймер назад
            setTime(parseTime(-timeDiff));
        }, 1000); // 1000ms
    }, []); // здесь пустой массив, чтобы эффект случился только при первом рендере

    return (
        <div className={b('block')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                    d="M11.0001 7.26663V11L13.3334 13.3333M20.3334 11C20.3334 16.1546 16.1547 20.3333 11.0001 20.3333C5.84542 20.3333 1.66675 16.1546 1.66675 11C1.66675 5.8453 5.84542 1.66663 11.0001 1.66663C16.1547 1.66663 20.3334 5.8453 20.3334 11Z"
                    stroke="#888888"
                    strokeWidth="2.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            {time}
        </div>
    );
};
