import React from 'react'
import deleteIcon from '../Images/Icons/delete.png';
import ICandidate from '../Models/Interfaces/ICandidate'
import CandidateService from '../Services/CandidateService';
import ICandidateListProps from './Interfaces/ICandidateListProps'


export default function CandidateList({ allCandidates, refreshCandidateList } : ICandidateListProps) {

	const removeCandidate = async (candidateId?: number) => {
		if (candidateId) {
			const { deleteCandidate } = new CandidateService();
			await deleteCandidate(candidateId);
			refreshCandidateList();
		}
	}
	return (
		<section>
			<ul>
				{ allCandidates.map((candidate: ICandidate) => {
					return <li key={candidate.id}>
						<span>{ `${candidate.fullName} - Nº ${candidate.electoralNumber}` }</span>
						<button onClick={ () => removeCandidate(candidate.id) }><img alt="Delete Action" src={deleteIcon} /></button>
					</li>
				}) }
			</ul>
		</section>
	)
}
