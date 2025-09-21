import React, { useState, useEffect } from 'react';
import { useUnit } from 'effector-react';

import { bem, useSafari } from '../../../../shared/lib';
import { $teamsStore, getTeams } from '../../../../entities/participant-team';
import { $stantionsStore, getStantions } from '../../../../entities/stantion';
import { $curatorStore, getCurator } from '../../../../entities/curator';
import { $userStore } from '../../../../entities/user';

import { Page } from '../../../../shared/ui/page';
import { StatusPlate } from '../../../../shared/ui/status-plate';

import { CuratorTeams } from '../curator-teams';

import './index.scss';

const b = bem('curator-page');

export const CuratorPage = () => {
  // TODO Без 2 лоадингов точно не работало, а что – забылось во времени
  const { loading: tLoading } = useUnit($teamsStore);
  const { loading: sLoading } = useUnit($stantionsStore);
  const { loading: cLoading } = useUnit($curatorStore);
  const { me } = useUnit($userStore);

  const t2Loading = useUnit(getTeams.pending);
  const s2Loading = useUnit(getStantions.pending);

  useEffect(() => {
    if (!t2Loading) {
      getTeams();
    }

    if (!s2Loading) {
      getStantions();
    }

    // Принудительно перезагружаем данные куратора
    if (me?.user_id) {
      getCurator(me.user_id);
    }
  }, [me?.user_id]);

  const safari = useSafari();

  if (tLoading || sLoading || cLoading) {
    return <Page>Загрузка...</Page>;
  }

  return (
    <Page>
      <StatusPlate type="curator" />

      <CuratorTeams mix={b('teams', { safari })} />
    </Page>
  );
};
