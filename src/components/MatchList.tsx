import { useState, useEffect } from 'react';


import { fetchMatchesList } from '../services';
import { MatchDTO, Region } from '../types';

const PAGE_SIZE = 3;

const MatchList = ({ puuid, region }: { puuid: string, region: Region }) => {
  const [matches, setMatches] = useState<MatchDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(0);

  useEffect(() => {
    const fetchMoreMatches = async () => {
      setIsLoading(true);
      const newMatches = await fetchMatchesList(puuid, region, PAGE_SIZE, pageNumber * PAGE_SIZE);
      setIsLoading(false);
      setMatches(prevMatches => [...prevMatches, ...newMatches]);
      if (newMatches.length < PAGE_SIZE) {
        setHasNextPage(false);
      }
    };

    fetchMoreMatches();
  }, [puuid, region, pageNumber]);

  const handleLoadMore = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };
console.log(matches)
  return (
    <div>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>{/* render match item */} {match.info.gameMode}</li>
        ))}
      </ul>
      {isLoading && <div>Loading...</div>}
      {hasNextPage && !isLoading && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default MatchList