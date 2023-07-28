import React from 'react';

import { bem } from '../../utils/bem';
import { Page } from '../../Components/page';
import { StatusPlate } from '../../Components/status-plate';
import { ParticipantLocations } from '../../Components/participant-locations';

import './index.scss';

const b = bem('participant-cabinet');

export const Participant = () => {
    return (
        <Page mix={b()}>
            <StatusPlate type="participant" />

            <ParticipantLocations mix={b("locations")} />
        </Page>
    );
};
