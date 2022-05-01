import React from 'react'
import ICandidate from '../Models/Interfaces/ICandidate'
import ICandidateListProps from './Interfaces/ICandidateListProps'


export default function CandidateList({ allCandidates } : ICandidateListProps) {
	return (
		<section>
			<ul>
				{ allCandidates.map((candidate: ICandidate) => {
					return <li key={candidate.id}>{ `${candidate.fullName} - Nº ${candidate.electoralNumber}` }</li>
				}) }
			</ul>
		</section>
	)
}
