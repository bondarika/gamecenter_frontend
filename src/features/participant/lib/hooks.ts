import { useMemo } from 'react';
import { useUnit } from 'effector-react';

import { $stantionsStore } from '../../../entities/stantion';

export const useOrderedStantionsById = (
  stantionOrderId: number | undefined
) => {
  const { stantionsOrder, stantions } = useUnit($stantionsStore);

  const teamStantionsOrder = useMemo(
    () => stantionsOrder?.find(({ id }) => id === stantionOrderId),
    [stantionOrderId, stantionsOrder]
  );

  const orderedStantions = useMemo(() => {
    console.log('Debug useOrderedStantionsById:');
    console.log('stantionOrderId:', stantionOrderId);
    console.log('stantionsOrder:', stantionsOrder);
    console.log('teamStantionsOrder:', teamStantionsOrder);
    console.log('stantions:', stantions);

    if (!teamStantionsOrder?.order || !stantions) {
      return undefined;
    }

    return teamStantionsOrder.order
      .filter((id) => id != null) // убираем null/undefined ID
      .map((stantionId) => stantions[stantionId])
      .filter((stantion) => stantion != null); // убираем undefined станции
  }, [stantions, teamStantionsOrder]);

  return orderedStantions;
};
