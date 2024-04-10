import { getRandomInt } from '@/utils';

export const getRandomItemFromRepository = <T>(repository: Map<number, T>) => {
  return repository.get(getRandomInt(1, repository.size));
};
