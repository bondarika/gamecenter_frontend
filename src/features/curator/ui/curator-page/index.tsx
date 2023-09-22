import React from 'react';
import { useUnit } from 'effector-react';

import { $userStore } from '../../../../entities/user';
import { $teamsStore, getTeams } from '../../../../entities/participant-team';
import { $stantionsStore, getStantions } from '../../../../entities/stantion';

import { Page } from '../../../../shared/ui/page';
import { StatusPlate } from '../../../../shared/ui/status-plate';

import { CuratorTeams } from '../curator-teams';

import './index.scss';

// znv-asb-Jvb-ZBK
export const CuratorPage = () => {
    const { loading: tLoading } = useUnit($teamsStore);
    const { loading: sLoading } = useUnit($stantionsStore);

    const t2Loading = useUnit(getTeams.pending);
    const s2Loading = useUnit(getStantions.pending);

    React.useEffect(() => {
        if (!t2Loading) {
            getTeams();
        }

        if (!s2Loading) {
            getStantions();
        }
    }, []);

    if (tLoading || sLoading) {
        return <Page>Загрузка...</Page>;
    }

    return (
        <Page>
            <StatusPlate type="curator" />

            <CuratorTeams mix="curator-page__teams" />
        </Page>
    );
};
