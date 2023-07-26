import React from 'react';

import { bem } from '../../utils/bem';

import { Page } from '../../Components/page';
import { StatusPlate } from '../../Components/status-plate';

import './index.scss';

const b = bem('curator-cabinet');

export const Curator = () => {
    return (
        <Page mix={b()}>
            <StatusPlate type="curator" />
        </Page>
    );
};
