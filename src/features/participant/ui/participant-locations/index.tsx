import cx from 'classnames';
import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import {
  $teamsStore,
  ParticipantTeam,
} from '../../../../entities/participant-team';

import { plural, bem } from '../../../../shared/lib';
import { BriefArticle } from '../../../../shared/ui/brief-article';
import { PopupPlate } from '../../../../shared/ui/popup-plate';
import {
  StatusPlatePointsRaw,
  StatusPlateTimeRaw,
} from '../../../../shared/ui/status-plate/';

import { useOrderedStantionsById } from '../../lib/hooks';

import './index.scss';

export const b = bem('participant-locations');

interface Props {
  mix?: string;
}

export const ParticipantLocations = ({ mix }: Props) => {
  const { team } = useUnit($teamsStore);

  const redirect = useNavigate();
  const orderedStantions = useOrderedStantionsById(team?.stations);

  useEffect(() => {
    if (
      team?.current_station &&
      orderedStantions?.length &&
      team.current_station > orderedStantions.length
    ) {
      redirect('/finisher');
    }
  }, [team?.current_station, orderedStantions?.length]);

  return (
    <div className={cx(b(), mix)}>
      {orderedStantions?.map((stantion, index) => {
        if (!stantion) {
          return;
        }
        const { id, name, description, assignment, image } = stantion;

        index += 1;

        let status: 'active' | 'finished' | 'locked';
        if (index === team!.current_station) {
          status = 'active';
        } else if (index < team!.current_station) {
          status = 'finished';
        } else {
          status = 'locked';
        }

        if (status !== 'active') {
          return (
            <PopupPlate
              mix={b('content-wrapper')}
              title={name}
              status={status}
              numberic={index}
              key={id}
              color="gray"
            />
          );
        }

        let imgSrc = '';
        if (image && image !== 'null') {
          console.log('Original image from station:', image);
          let parsed = '';
          const img = image.split('/');
          console.log('Split image parts:', img);
          // Исправляем логику: начинаем с индекса 0, а не 3
          for (let i = 0; i < img.length; i++) {
            parsed += '/' + img[i];
          }
          imgSrc = `http://играцентр.рф:8000${parsed}`;
          console.log('Final imgSrc:', imgSrc);
        } else {
          console.log('No image or image is null:', image);
        }

        return (
          <PopupPlate
            mix={b('content-wrapper')}
            title={name}
            status={team?.current_station === 10 ? 'finish-stantion' : 'active'}
            numberic={index}
            key={id}
            defaultExpanded={true}
            color="gray"
          >
            <BriefArticle
              title="Историческая справка"
              color="white"
              markdown={description}
              image={imgSrc}
            />
            <BriefArticle
              title="Задание"
              markdown={assignment}
              color="white"
              mix={b('question')}
              Footer={() => (
                <div style={{ display: 'flex', marginTop: 12 }}>
                  <StatusPlateTimeRaw
                    time={`${stantion.time} ${plural(
                      ['минута', 'минуты', 'минут'],
                      stantion.time
                    )}`}
                    mix={b('time-plate')}
                  />
                  <StatusPlatePointsRaw score={stantion.points} />
                </div>
              )}
            />
          </PopupPlate>
        );
      })}
    </div>
  );
};
