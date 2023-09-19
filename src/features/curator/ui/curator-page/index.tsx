import React from 'react';

import { Page } from '../../../../shared/ui/page';
import { StatusPlate } from '../../../../shared/ui/status-plate';

import { CuratorTeams } from '../curator-teams';

import './index.scss';

// znv-asb-Jvb-ZBK
export const CuratorPage = () => {
    return (
        <Page>
            <StatusPlate type="curator" />

            <CuratorTeams mix="curator-page__teams" />
        </Page>
    );
};
