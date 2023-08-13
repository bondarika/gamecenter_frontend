import React from 'react';

import { Page } from '../../../../shared/ui/page';
import { StatusPlate } from '../../../../shared/ui/status-plate';

import { ParticipantLocations } from '../participant-locations';

import './index.scss';

export const ParticipantPage = () => {
    return (
        <Page>
            <StatusPlate type="participant" />

            <ParticipantLocations mix="participant-page__locations" />
        </Page>
    );
};
