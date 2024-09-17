import { useUnit } from 'effector-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { $userStore } from '../../../../entities/user';

import { bem, useSafari } from '../../../../shared/lib';
import { Page } from '../../../../shared/ui/page';
import { StatusPlate } from '../../../../shared/ui/status-plate';
import { Logo } from '../../../../shared/ui/logo';

import { FinishBlockParticipant } from '../finish-block-participant';
import { FinishBlockCurator } from '../finish-block-curator';

import './index.scss';

export const b = bem('finish-page');

export const FinishPage = () => {
    const { me } = useUnit($userStore);

    const redirect = useNavigate();

    const safari = useSafari();

    if (!me) {
        redirect('/');
        return null;
    }

    return (
        <Page>
            <StatusPlate type={me.is_player ? 'participant' : 'curator'} />

            <div className={b('content', { safari })}>
                <Logo mix={b('logo')} />

                {me.is_player ? <FinishBlockParticipant /> : <FinishBlockCurator />}
            </div>
        </Page>
    );
};
