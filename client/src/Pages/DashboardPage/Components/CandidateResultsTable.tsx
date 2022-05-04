import React from 'react';
import ICandidate from '../../../Models/Interfaces/ICandidate';
import ICandidateList from '../../../Interfaces/ICandidateListProps';

export default function CandidateResultsTable({
  allCandidates,
}: ICandidateList) {
  return (
    <div>
      {allCandidates && allCandidates.length && (
        <table className='candidates-table'>
          <tr>
            <th>Nome completo</th>
            <th>Vice</th>
            <th>Nº de votação</th>
            <th>Partido</th>
          </tr>
          {allCandidates.map((candidate: ICandidate) => {
            return (
              <tr>
                <td>{candidate.fullName}</td>
                <td>{candidate.electoralNumber}</td>
                <td>{candidate.party}</td>
                <td>{candidate.voteCount}</td>
              </tr>
            );
          })}
        </table>
      )}
    </div>
  );
}
