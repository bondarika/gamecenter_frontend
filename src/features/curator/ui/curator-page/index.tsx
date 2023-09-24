import React, { useState, useEffect } from 'react';
import { useUnit } from 'effector-react';

import { bem } from '../../../../shared/lib';
import { $teamsStore, getTeams } from '../../../../entities/participant-team';
import { $stantionsStore, getStantions } from '../../../../entities/stantion';

import { Page } from '../../../../shared/ui/page';
import { StatusPlate } from '../../../../shared/ui/status-plate';

import { CuratorTeams } from '../curator-teams';

import './index.scss';

const b = bem('curator-page');

// znv-asb-Jvb-ZBK
export const CuratorPage = () => {
    const { loading: tLoading } = useUnit($teamsStore);
    const { loading: sLoading } = useUnit($stantionsStore);

    const t2Loading = useUnit(getTeams.pending);
    const s2Loading = useUnit(getStantions.pending);

    useEffect(() => {
        if (!t2Loading) {
            getTeams();
        }

        if (!s2Loading) {
            getStantions();
        }
    }, []);

    const [safari, setImInHell] = useState(false);
    useEffect(() => {
        if (navigator.userAgent.match(/AppleWebKit/) && !navigator.userAgent.match(/Chrome/)) {
            setImInHell(true);
        }
    });

    if (tLoading || sLoading) {
        return <Page>Загрузка...</Page>;
    }

    return (
        <Page>
            <StatusPlate type="curator" />

            <CuratorTeams mix={b('teams', { safari })} />
        </Page>
    );
};
