import React from 'react';
import { useUnit } from 'effector-react';

import { $userStore } from '../../../../entities/user';
import { $teamsStore, getTeams } from '../../../../entities/participant-team';
import { $curatorStore, getCurator } from '../../../../entities/curator';
import { $stantionsStore, getStantions } from '../../../../entities/stantion';

import { Page } from '../../../../shared/ui/page';
import { StatusPlate } from '../../../../shared/ui/status-plate';

import { CuratorTeams } from '../curator-teams';

import './index.scss';

// znv-asb-Jvb-ZBK
export const CuratorPage = () => {
    const { me } = useUnit($userStore);

    const { loading: tLoading } = useUnit($teamsStore);
    const { loading: sLoading } = useUnit($stantionsStore);
    const { loading: cLoading } = useUnit($curatorStore);

    const t2Loading = useUnit(getTeams.pending);
    const s2Loading = useUnit(getStantions.pending);

    React.useEffect(() => {
        getCurator(me!.user_id);

        if (!t2Loading) {
            getTeams();
        }

        if (!s2Loading) {
            getStantions();
        }
    }, []);

    if (tLoading || sLoading || cLoading) {
        return <Page>Загрузка...</Page>;
    }

    return (
        <Page>
            <StatusPlate type="curator" />

            <CuratorTeams mix="curator-page__teams" />
        </Page>
    );
};
