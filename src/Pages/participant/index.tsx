import React from 'react';

import { bem } from '../../utils/bem';

import { Page } from '../../Components/page';
import { StatusPlate } from '../../Components/status-plate';

// здесь будет не попап плейт, а компонент с локацией участника,
// вставил чтобы потеститровать
import { PopupPlate } from '../../Components/popup-plate';

import './index.scss';

const b = bem('participant-cabinet');

export const Participant = () => {
    return (
        <Page mix={b()}>
            <StatusPlate type="participant" />

            <PopupPlate title={'лока 1'} status="finished" numberic={1} />
            <PopupPlate title={'лока 2'} status="finished" numberic={2} />
            <PopupPlate title={'Дом Зингера'} status="active" numberic={3} />
            <PopupPlate title={'лока 4'} status="locked" numberic={4} />
        </Page>
    );
};
