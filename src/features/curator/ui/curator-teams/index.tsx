import React from 'react';
import cx from 'classnames';

import { bem } from '../../../../shared/lib';
import { PopupPlate } from '../../../../shared/ui/popup-plate';

import type { Team } from '../../model/typing';

import './index.scss';

interface Props {
    mix?: string;
}

export const b = bem('curator-teams');

export const CuratorTeams = ({ mix }: Props) => {
    const curatorLocationId = 2;
    const teams: Team[] = [
        {
            id: 132,
            name: 'подопытные',
            visitedLocationsId: [2],
        },
        {
            id: 241,
            name: 'адмиралы',
            visitedLocationsId: [2],
        },
        {
            id: 3312,
            name: 'дети улиц',
            visitedLocationsId: [],
        },
        {
            id: 412,
            name: 'носферату',
            visitedLocationsId: [],
        },
        {
            id: 5123,
            name: 'шаблонные',
            visitedLocationsId: [2],
        },
    ];

    return <div className={cx(b(), mix)}></div>;
};
