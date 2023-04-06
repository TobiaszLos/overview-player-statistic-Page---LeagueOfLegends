export const getGameType = (queueId: number) => {
  switch (queueId) {
    case 450:
      return 'ARAM';
    case 430:
      return 'Normal Blind';
    case 420:
      return 'Ranked Solo';
    case 440:
      return 'Ranked Flex';
    case 400:
      return 'Normal Draft';
    default:
      return 'Custom game';
  }
};