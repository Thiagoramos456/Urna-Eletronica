import React, { useCallback, useEffect } from 'react';
import CandidateList from '../Components/CandidateList';
import CandidateRegisterForm from '../Components/CandidateRegisterForm';
import ICandidate from '../Models/Interfaces/ICandidate';
import CandidateService from '../Services/CandidateService';

export default function CandidateRegisterPage() {
  const [allCandidates, setAllCandidates] = React.useState<ICandidate[]>([]);
  const { getCandidates } = new CandidateService();

  const refreshCandidateList = useCallback(async () => {
    const candidates = await getCandidates();    
    setAllCandidates(candidates);
  }, [getCandidates])

  
  useEffect(() => { (async () => { await refreshCandidateList() })(); }, [refreshCandidateList])

  return (
    <main>
      <CandidateRegisterForm refreshCandidateList={refreshCandidateList} />
      <CandidateList allCandidates={ allCandidates } />
    </main>
  );
}
