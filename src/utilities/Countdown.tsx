import { useEffect, useState } from 'react';

export const Countdown = ({ gameLength }: { gameLength: number }) => {
  const [remainingTime, setRemainingTime] = useState(gameLength);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Countdown</h1>
      <p>Remaining Time: {formatTime(remainingTime)}</p>
    </div>
  );
};

export default Countdown;
