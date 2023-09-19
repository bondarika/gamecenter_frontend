import { createEffect } from 'effector';

import { get } from '../../shared/lib';

import type { Stantion, StantionsOrder, RawStantionsOrder } from './typings';

export const getStantions = createEffect(async () => {
    const [rawStantions, rawStantionsOrder] = await Promise.all([get('/station/'), get('/stationorder/')]);

    const stantions: Record<Stantion['id'], Stantion> = {};
    rawStantions.forEach((stantion: Stantion) => {
        stantions[stantion.id] = stantion;
    });

    const stantionsOrder: StantionsOrder[] = rawStantionsOrder.map(
        ({ id, first, second, third, forth, fifth, sixth, seventh, eighth, ninth, tenth }: RawStantionsOrder) => ({
            id,
            order: [first, second, third, forth, fifth, sixth, seventh, eighth, ninth, tenth],
        }),
    );

    return { stantions, stantionsOrder };
});
