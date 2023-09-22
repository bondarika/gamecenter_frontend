import { useMemo } from 'react';
import { useUnit } from 'effector-react';

import { $stantionsStore } from '../../../entities/stantion';

export const useOrderedStantionsById = (stantionOrderId: number | undefined) => {
    const { stantionsOrder, stantions } = useUnit($stantionsStore);

    const teamStantionsOrder = useMemo(
        () => stantionsOrder?.find(({ id }) => id === stantionOrderId),
        [stantionOrderId, stantionsOrder],
    );

    const orderedStantions = useMemo(
        () => teamStantionsOrder?.order.map((stantionId) => stantions?.[stantionId]),
        [stantions, teamStantionsOrder],
    );

    return orderedStantions;
};
