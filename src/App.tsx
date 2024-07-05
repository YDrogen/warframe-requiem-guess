import { Fragment, useState } from 'react';

import { RequiemCard } from '@/components/requiem-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import type { REQUIEM, REQUIEM_NAME } from '@/requiems';
import { REQUIEMS } from '@/requiems';

export default function App() {
  const [knownRequiems, setKnownRequiems] = useState<REQUIEM_NAME[]>([]);
  const [bannedRequiems, setBannedRequiems] = useState<
    {
      requiem: REQUIEM;
      index: number;
    }[]
  >([]);

  const selectRequiem = (requiem: REQUIEM_NAME) => () => {
    if (knownRequiems.includes(requiem)) {
      setKnownRequiems(knownRequiems.filter((r) => r !== requiem));
    } else {
      if (knownRequiems.length < 3) {
        setKnownRequiems([...knownRequiems, requiem]);
      }
    }
  };

  const getSequences = () => {
    const sequences: REQUIEM[][] = [];
    for (let i = 0; i < REQUIEMS.length; i++) {
      for (let j = 0; j < REQUIEMS.length; j++) {
        for (let k = 0; k < REQUIEMS.length; k++) {
          if (i !== j && j !== k && i !== k) {
            const combi = [REQUIEMS[i], REQUIEMS[j], REQUIEMS[k]];
            if (knownRequiems.length === 0) {
              sequences.push(combi);
            } else {
              if (
                knownRequiems.every((requiem) =>
                  combi.some((r) => r.name === requiem),
                )
              ) {
                sequences.push(combi);
              }
            }
          }
        }
      }
    }

    return sequences.filter((combination) => {
      return !bannedRequiems.some(
        (banned) => combination[banned.index].name === banned.requiem.name,
      );
    });
  };

  const banRequiem = (combination: REQUIEM[], index: number) => () => {
    setBannedRequiems((prev) => [
      ...prev,
      { requiem: combination[index], index },
    ]);
  };

  const unbanRequiem = (requiem: REQUIEM, index: number) => () => {
    setBannedRequiems((prev) =>
      prev.filter(
        (banned) =>
          banned.requiem.name !== requiem.name || banned.index !== index,
      ),
    );
  };

  return (
    <HStack className='p-4 size-full justify-start items-start' gap={4}>
      <Card>
        <CardHeader>
          <CardTitle>Requiem Mods</CardTitle>
          <CardDescription>Select requiems you have discovered</CardDescription>
        </CardHeader>

        <CardContent>
          <VStack gap={4}>
            {REQUIEMS.map((requiem) => (
              <RequiemCard
                key={requiem.name}
                requiem={requiem}
                onPress={selectRequiem}
                isSelected={knownRequiems.includes(requiem.name)}
              />
            ))}
          </VStack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Possible sequences</CardTitle>
          <CardDescription>
            Select requiems you tried on that position
          </CardDescription>
        </CardHeader>

        <CardContent>
          <VStack gap={4}>
            {getSequences().map((combination) => (
              <Fragment key={`${combination.map((v) => v.name).join('-')}`}>
                <HStack gap={4}>
                  {combination.map((requiem, index) => (
                    <RequiemCard
                      key={requiem.name}
                      requiem={requiem}
                      onPress={() => banRequiem(combination, index)}
                      isSelected
                    />
                  ))}
                </HStack>
                <div className='w-full h-[1px] bg-slate-100' />
              </Fragment>
            ))}
          </VStack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Banned Requiems</CardTitle>
          <CardDescription>Requiems you have tried</CardDescription>
        </CardHeader>

        <CardContent>
          <VStack gap={4}>
            {bannedRequiems.map(({ requiem, index }) => (
              <RequiemCard
                key={requiem.name}
                requiem={{
                  ...requiem,
                  description: `Tried at position ${index + 1}`,
                }}
                onPress={() => unbanRequiem(requiem, index)}
                isSelected
              />
            ))}
          </VStack>
        </CardContent>
      </Card>
    </HStack>
  );
}
