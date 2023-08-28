import React, { useEffect, useState } from 'react';

import { ParticipantTeam } from '../../../../entities/participant-team';

import { useTimer, getSpentTime, bem } from '../../../../shared/lib';
import { BriefArticle } from '../../../../shared/ui/brief-article';
import { Button } from '../../../../shared/ui/button';

import './index.scss';

interface Props {
    team: ParticipantTeam;
    stantionTime: number;
}

const b = bem('curator-team');

export const CuratorTeam = ({ team, stantionTime }: Props) => {
    const { spentTime, startTimer, stopTimer, isTimerStarted, isTimeEnded, forceUpdateTimer } = useTimer();

    const [answerAccepted, setAnswerAccepted] = React.useState(
        Boolean(localStorage.getItem(`${team.teamname}-end-time`)),
    );

    useEffect(() => {
        // если команда уже стартовала, или закончила, но баллы еще не отправлены
        const startTime = localStorage.getItem(`${team.teamname}-start-time`);

        if (answerAccepted) {
            const endTime = localStorage.getItem(`${team.teamname}-end-time`);
            forceUpdateTimer(Number(endTime) - Number(startTime), stantionTime);

            return;
        } else if (startTime) {
            startTimer(Number(startTime), stantionTime);
        }
    }, []);

    const handleStart = () => {
        const time = Date.now() / 1000;
        localStorage.setItem(`${team.teamname}-start-time`, String(time));

        startTimer(time, stantionTime);
    };

    const handleStop = () => {
        stopTimer();

        setAnswerAccepted(true);
        localStorage.setItem(`${team.teamname}-end-time`, String(Date.now() / 1000));
    };

    return (
        <>
            <BriefArticle
                color="white"
                title="Станция"
                Footer={() => {
                    return (
                        <div className={b('controls')}>
                            <Button
                                onClick={handleStart}
                                disabled={isTimerStarted || answerAccepted}
                                color="blue"
                                mix={b('control')}
                                size="s"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 14 14"
                                    fill="#265178"
                                >
                                    <path d="M1.97656 13.8281C1.34375 13.8281 0.898438 13.3438 0.898438 12.5703V1.42969C0.898438 0.65625 1.34375 0.171875 1.97656 0.171875C2.3125 0.171875 2.59375 0.289062 2.95312 0.5L12.1562 5.82812C12.8359 6.21875 13.1016 6.51562 13.1016 7C13.1016 7.48438 12.8359 7.78125 12.1562 8.17188L2.95312 13.5078C2.59375 13.7109 2.3125 13.8281 1.97656 13.8281Z" />
                                    <path d="M1.97656 13.8281C1.34375 13.8281 0.898438 13.3438 0.898438 12.5703V1.42969C0.898438 0.65625 1.34375 0.171875 1.97656 0.171875C2.3125 0.171875 2.59375 0.289062 2.95312 0.5L12.1562 5.82812C12.8359 6.21875 13.1016 6.51562 13.1016 7C13.1016 7.48438 12.8359 7.78125 12.1562 8.17188L2.95312 13.5078C2.59375 13.7109 2.3125 13.8281 1.97656 13.8281Z" />
                                </svg>
                            </Button>
                            <Button
                                onClick={handleStop}
                                disabled={!isTimerStarted || answerAccepted}
                                color="orange"
                                mix={b('control')}
                                size="s"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="16"
                                    viewBox="0 0 14 14"
                                    fill="#853D16"
                                >
                                    <path d="M0.507812 11.6953V2.30469C0.507812 1.1875 1.21094 0.507812 2.36719 0.507812H11.6328C12.7891 0.507812 13.4922 1.1875 13.4922 2.30469V11.6953C13.4922 12.8125 12.7891 13.4922 11.6328 13.4922H2.36719C1.21094 13.4922 0.507812 12.8125 0.507812 11.6953Z" />
                                    <path d="M0.507812 11.6953V2.30469C0.507812 1.1875 1.21094 0.507812 2.36719 0.507812H11.6328C12.7891 0.507812 13.4922 1.1875 13.4922 2.30469V11.6953C13.4922 12.8125 12.7891 13.4922 11.6328 13.4922H2.36719C1.21094 13.4922 0.507812 12.8125 0.507812 11.6953Z" />
                                </svg>
                            </Button>
                            <div className={b('timer', { 'too-much': isTimeEnded })}>{spentTime}</div>
                            <div className={b('stantion-time')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                >
                                    <path
                                        d="M11 7.26669V11L13.3333 13.3334M20.3333 11C20.3333 16.1547 16.1546 20.3334 11 20.3334C5.8453 20.3334 1.66663 16.1547 1.66663 11C1.66663 5.84536 5.8453 1.66669 11 1.66669C16.1546 1.66669 20.3333 5.84536 20.3333 11Z"
                                        stroke="#888888"
                                        strokeWidth="2.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span>20</span> <span id="mobile-none">минут</span>
                            </div>
                        </div>
                    );
                }}
            />
        </>
    );
};
