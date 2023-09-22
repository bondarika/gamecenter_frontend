import React from 'react';
import { useMedia } from 'react-use';

import { bem } from '../../lib';
import { Logo } from '../logo';

import { StatusPlateTime } from './__time';
import { StatusPlateLocations } from './__locations';
import { StatusPlatePoints } from './__points';
import { StatusPlateTeams } from './__teams';
import { StatusPlateStantionName } from './__stantion-name';

import './index.scss';

interface Props {
    type: 'participant' | 'curator';
}

export const b = bem('status-plate');

export const StatusPlate = ({ type }: Props) => {
    const isSmallMobile = useMedia('(max-width: 420px)');

    return (
        <div className={b()}>
            {isSmallMobile ? (
                <div className={b('flex-center')}>
                    <Logo mix={b('logo')} />
                    {type === 'participant' && <StatusPlateTime />}
                </div>
            ) : (
                <Logo mix={b('logo')} />
            )}

            {type === 'curator' && <StatusPlateStantionName />}

            <div className={b('flex-center')}>
                {!isSmallMobile && type === 'participant' && <StatusPlateTime />}

                {type === 'participant' && (
                    <>
                        <StatusPlateLocations />
                        <StatusPlatePoints />
                    </>
                )}

                {type === 'curator' && <StatusPlateTeams />}
            </div>
        </div>
    );
};
