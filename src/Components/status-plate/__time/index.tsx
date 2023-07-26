import React from 'react';

import { b } from '../index';

export const StatusPlateTime = () => {
    // parse time
    const time = "0:34:28";

    return (
        <div className={b('block')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                    d="M11.0001 7.26663V11L13.3334 13.3333M20.3334 11C20.3334 16.1546 16.1547 20.3333 11.0001 20.3333C5.84542 20.3333 1.66675 16.1546 1.66675 11C1.66675 5.8453 5.84542 1.66663 11.0001 1.66663C16.1547 1.66663 20.3334 5.8453 20.3334 11Z"
                    stroke="#888888"
                    stroke-width="2.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>

            {time}
        </div>
    );
};
