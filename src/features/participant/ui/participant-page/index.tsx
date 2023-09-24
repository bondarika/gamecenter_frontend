import React, { useEffect, useState } from 'react';
import { useUnit } from 'effector-react';

import { bem } from '../../../../shared/lib';

import { $stantionsStore, getStantions } from '../../../../entities/stantion';

import { Page } from '../../../../shared/ui/page';
import { StatusPlate } from '../../../../shared/ui/status-plate';

import { ParticipantLocations } from '../participant-locations';

import './index.scss';

const b = bem('participant-page');

export const ParticipantPage = () => {
    const { loading: sLoading } = useUnit($stantionsStore);

    useEffect(() => {
        getStantions();
    }, []);

    const [safari, setImInHell] = useState(false);
    useEffect(() => {
        if (navigator.userAgent.match(/AppleWebKit/) && !navigator.userAgent.match(/Chrome/)) {
            setImInHell(true);
        }
    });

    if (sLoading) {
        return <Page>Загрузка...</Page>;
    }

    return (
        <Page>
            <StatusPlate type="participant" />

            <ParticipantLocations mix={b('locations', { safari })} />
        </Page>
    );
};
