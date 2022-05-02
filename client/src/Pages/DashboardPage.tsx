import React, { useCallback, useEffect } from 'react';
import ICandidate from '../Models/Interfaces/ICandidate';
import CandidateService from '../Services/CandidateService';

export default function DashboardPage() {
  const [allCandidates, setAllCandidates] = React.useState<ICandidate[]>([]);

  const refreshCandidateList = useCallback(async () => {
    const { getCandidates } = new CandidateService();

    const candidates = await getCandidates(true);
    setAllCandidates(candidates);
  }, []);

  useEffect(() => {
    (async () => {
      await refreshCandidateList();
    })();
  }, [refreshCandidateList]);

  return (
    <main>
      <ul>
        {allCandidates.map((candidate: ICandidate) => {
          return (
            <li key={candidate.id}>
              <span>{`${candidate.fullName} - Nº ${candidate.electoralNumber}. Votos: ${candidate.voteCount}`}</span>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
