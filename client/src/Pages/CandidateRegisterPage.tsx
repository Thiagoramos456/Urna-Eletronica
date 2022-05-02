import React, { useCallback, useEffect } from 'react';
import CandidateList from '../Components/CandidateList';
import CandidateRegisterForm from '../Components/CandidateRegisterForm';
import ICandidate from '../Models/Interfaces/ICandidate';
import CandidateService from '../Services/CandidateService';

export default function CandidateRegisterPage() {
  const [allCandidates, setAllCandidates] = React.useState<ICandidate[]>([]);

  const refreshCandidateList = useCallback(async () => {
    const { getCandidates } = new CandidateService();

    const candidates = await getCandidates();    
    setAllCandidates(candidates);
  }, [])

  
  useEffect(() => { (async () => { await refreshCandidateList() })(); }, [refreshCandidateList])

  return (
    <main>
      <CandidateRegisterForm refreshCandidateList={refreshCandidateList} />
      <CandidateList refreshCandidateList={refreshCandidateList} allCandidates={ allCandidates } />
    </main>
  );
}
