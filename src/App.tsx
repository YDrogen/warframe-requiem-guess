import { Fragment } from 'react';
import { useImmer } from 'use-immer';

import { RequiemCard } from '@/components/requiem-card';
import { SplitCard } from '@/components/split-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import type { Requiem } from '@/requiem';
import { REQUIEM_KNOWN_STATUS, REQUIEM_USAGE_STATUS, createRequiem } from '@/requiem';
import { REQUIEMS } from '@/requiems';

const staticRequiems = REQUIEMS.map((requiem) => createRequiem(requiem.name, requiem.img, requiem.description));

export default function App() {
  const [requiems, updateRequiems] = useImmer(staticRequiems);

  const knownRequiems = requiems.filter((requiem) => requiem.status === REQUIEM_KNOWN_STATUS.KNOWN);

  const getDescription = (requiem: Requiem) => {
    return requiem.usage
      .map((v, index) => {
        if (v === REQUIEM_USAGE_STATUS.SUCCESS) {
          return `Success use at position ${index + 1}`;
        }

        if (v === REQUIEM_USAGE_STATUS.FAILURE) {
          return `Failed use at position ${index + 1}`;
        }
      })
      .filter(Boolean)
      .join(', ');
  };

  const changeStatus = (requiem: Requiem) => () => {
    updateRequiems((requiems) => {
      const r = requiems.find((r) => r.name === requiem.name);

      if (r) {
        if (r.status === REQUIEM_KNOWN_STATUS.KNOWN) {
          if (!r.usage.some((u) => u === REQUIEM_USAGE_STATUS.SUCCESS)) {
            r.status = REQUIEM_KNOWN_STATUS.UNKNOWN;
          }
        } else {
          const knownRequiems = requiems.filter((r) => r.status === REQUIEM_KNOWN_STATUS.KNOWN);

          if (knownRequiems.length < 3) {
            r.status = REQUIEM_KNOWN_STATUS.KNOWN;
          }
        }
      }
    });
  };

  const confirmUsage = (requiem: Requiem, index: number) => () => {
    updateRequiems((requiems) => {
      const r = requiems.find((r) => r.name === requiem.name);

      if (r) {
        r.usage[index] = REQUIEM_USAGE_STATUS.SUCCESS;
        r.status = REQUIEM_KNOWN_STATUS.KNOWN;
      }
    });
  };

  const failUsage = (requiem: Requiem, index: number) => () => {
    updateRequiems((requiems) => {
      const r = requiems.find((r) => r.name === requiem.name);

      if (r) {
        r.usage[index] = REQUIEM_USAGE_STATUS.FAILURE;
      }
    });
  };

  const getSequences = () => {
    const sequences: Requiem[][] = [];
    for (let i = 0; i < requiems.length; i++) {
      for (let j = 0; j < requiems.length; j++) {
        for (let k = 0; k < requiems.length; k++) {
          if (i !== j && j !== k && i !== k) {
            const combi = [requiems[i], requiems[j], requiems[k]];

            // check is combi includes all known requiems
            if (knownRequiems.length > 0 && !knownRequiems.every((r) => combi.some((c) => c.name === r.name))) {
              continue;
            }

            // check if combi includes any banned requiem
            if (combi.some((r) => r.usage.some((u) => u === REQUIEM_USAGE_STATUS.FAILURE))) {
              let isOk = true;

              if (combi[0].usage[0] === REQUIEM_USAGE_STATUS.FAILURE) {
                isOk = false;
              }

              if (combi[1].usage[1] === REQUIEM_USAGE_STATUS.FAILURE) {
                isOk = false;
              }

              if (combi[2].usage[2] === REQUIEM_USAGE_STATUS.FAILURE) {
                isOk = false;
              }

              if (!isOk) {
                continue;
              }
            }

            // check if combi includes any success requiem
            const successRequiems = combi
              .map((r) => r.usage.some((u) => u === REQUIEM_USAGE_STATUS.SUCCESS))
              .filter(Boolean).length;

            if (combi.some((r) => r.usage.some((u) => u === REQUIEM_USAGE_STATUS.SUCCESS))) {
              const isOk = [];

              if (combi[0].usage[0] === REQUIEM_USAGE_STATUS.SUCCESS) {
                isOk.push(true);
              }

              if (combi[1].usage[1] === REQUIEM_USAGE_STATUS.SUCCESS) {
                isOk.push(true);
              }

              if (combi[2].usage[2] === REQUIEM_USAGE_STATUS.SUCCESS) {
                isOk.push(true);
              }

              if (isOk.length !== successRequiems) {
                break;
              }
            }

            sequences.push(combi);
          }
        }
      }
    }

    return sequences;
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
            {requiems.map((requiem) => (
              <RequiemCard
                key={requiem.name}
                requiem={{
                  ...requiem,
                  description: getDescription(requiem),
                }}
                onPress={changeStatus}
              />
            ))}
          </VStack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Possible sequences</CardTitle>
          <CardDescription>Select requiems you tried on that position</CardDescription>
        </CardHeader>

        <CardContent>
          <VStack gap={4}>
            {getSequences().map((combination) => (
              <Fragment key={`${combination.map((v) => v.name).join('-')}`}>
                <HStack gap={4}>
                  {combination.map((requiem, index) => (
                    <SplitCard
                      key={requiem.name}
                      requiem={requiem}
                      index={index}
                      onLeftPress={confirmUsage}
                      onRightPress={failUsage}
                    />
                  ))}
                </HStack>
                <div className='w-full h-[1px] bg-slate-100' />
              </Fragment>
            ))}
          </VStack>
        </CardContent>
      </Card>
    </HStack>
  );
}
