import React from 'react';

export const parseTime = (allSeconds: number, onlyMinutes?: boolean) => {
    const hours = Math.floor(allSeconds / 3600);
    const minutes = Math.floor((allSeconds % 3600) / 60);
    const seconds = Math.floor(allSeconds % 60);

    if (onlyMinutes) {
        return `${minutes.toString().padStart(2, '0')}` + `:${seconds.toString().padStart(2, '0')}`;
    }

    return (
        `${hours.toString().padStart(2, '0')}` +
        `:${minutes.toString().padStart(2, '0')}` +
        `:${seconds.toString().padStart(2, '0')}`
    );
};

// в секундах
export const getSpentTime = (time: number = 0) => Date.now() / 1000 - time;

export const useTimer = () => {
    const [leftTime, setLeftTime] = React.useState('--:--:--');
    const [spentTime, setSpentTime] = React.useState('00:00');

    const [started, setStarted] = React.useState(false);
    const [ended, setEnded] = React.useState(false);

    const [myInterval, setMyInterval] = React.useState<NodeJS.Timer>();

    // логика в тотале, если брать куда то еще, то надо переписать чутка понятнее
    const intervalFunc = (startTime: number, timeToSpend: number) => () => {
        const spentTime = getSpentTime(startTime);

        updateTimer(spentTime, timeToSpend);
    };

    const handleStartTimer = (startTime: number, timeToSpend: number) => {
        setStarted(true);

        const f = intervalFunc(startTime, timeToSpend);
        f(); // чтобы не ждать первую секунду

        const i = setInterval(f, 1000);
        setMyInterval((prevInterval) => {
            // странный баг, дважды сетится интервал, решил так его пофиксить
            clearInterval(prevInterval);

            return i;
        });
    };

    const handleStopTimer = () => {
        clearInterval(myInterval);
    };

    const updateTimer = (spentTime: number, timeToSpend: number) => {
        setSpentTime(parseTime(spentTime, true));

        const leftTime = timeToSpend - spentTime;
        if (leftTime <= 0) {
            setEnded(true);
            setLeftTime('00:00:00');
        } else {
            setLeftTime(parseTime(leftTime));
        }
    };

    return {
        leftTime,
        spentTime,
        startTimer: handleStartTimer,
        stopTimer: handleStopTimer,
        isTimerStarted: started,
        isTimeEnded: ended,
        forceUpdateTimer: updateTimer,
    };
};
