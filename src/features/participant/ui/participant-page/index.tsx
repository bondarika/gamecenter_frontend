import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { redirect } from 'react-router';

import { $userStore } from '../../../../entities/user';
import { $teamsStore, getTeam } from '../../../../entities/participant-team';
import { $stantionsStore, getStantions } from '../../../../entities/stantion';

import { Page } from '../../../../shared/ui/page';
import { StatusPlate } from '../../../../shared/ui/status-plate';

import { ParticipantLocations } from '../participant-locations';

import './index.scss';

export const ParticipantPage = () => {
    const { me } = useUnit($userStore);

    const { loading: tLoading } = useUnit($teamsStore);
    const { loading: sLoading } = useUnit($stantionsStore);

    React.useEffect(() => {
        getTeam(me!.user_id);
        getStantions();
    }, []);

    if (tLoading || sLoading) {
        return <Page>загрузка</Page>;
    }

    return (
        <Page>
            <StatusPlate type="participant" />

            <ParticipantLocations mix="participant-page__locations" />
        </Page>
    );
};
