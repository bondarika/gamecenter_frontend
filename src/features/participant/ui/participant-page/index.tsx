import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';

import { $stantionsStore, getStantions } from '../../../../entities/stantion';

import { Page } from '../../../../shared/ui/page';
import { StatusPlate } from '../../../../shared/ui/status-plate';

import { ParticipantLocations } from '../participant-locations';

import './index.scss';

export const ParticipantPage = () => {
    const { loading: sLoading } = useUnit($stantionsStore);

    useEffect(() => {
        getStantions();
    }, []);

    if (sLoading) {
        return <Page>Загрузка...</Page>;
    }

    return (
        <Page>
            <StatusPlate type="participant" />

            <ParticipantLocations mix="participant-page__locations" />
        </Page>
    );
};
