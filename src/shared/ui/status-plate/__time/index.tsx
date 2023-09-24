import React from 'react';
import { useUnit } from 'effector-react';
import cx from 'classnames';
import { useNavigate } from 'react-router';

import { $teamsStore } from '../../../../entities/participant-team';

import { parseTime } from '../../../lib';

import { b } from '../status-plate';

const hours = Number(process.env.REACT_APP_TIME_ON_QUEST || 5);

export const StatusPlateTime = () => {
    const { team } = useUnit($teamsStore);
    const endTime = new Date(team?.start_time || 0).getTime() / 1000 + hours * 3600;

    const [time, setTime] = React.useState('--:--:--');

    // это нужно использовать выше, не в shared, но продумывать дальше логику долго
    const redirect = useNavigate();

    React.useEffect(() => {
        const interval: ReturnType<typeof setInterval> = setInterval(() => {
            const timeDiff = endTime - new Date().getTime() / 1000;

            if (timeDiff <= 0) {
                // значит квест закончился
                setTime(parseTime(0));

                clearInterval(interval);

                return redirect('/finisher');
            }

            setTime(parseTime(timeDiff)); // берем минус, тк идет обратный отсчет
        }, 1000);
    }, []); // здесь пустой массив, чтобы эффект случился только при первом рендере

    return <StatusPlateTimeRaw time={time} mix={b('wrapped-block')} />;
};

export const StatusPlateTimeRaw = ({ time, mix }: { time: string; mix: string }) => (
    <div className={cx(b('block'), mix)}>
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
