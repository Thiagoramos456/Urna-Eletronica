import React, { useCallback, useEffect } from 'react'
import ICandidate from '../Models/Interfaces/ICandidate';
import CandidateService from '../Services/CandidateService';

enum Digits {
	First,
	Second
}

type ElectoralNumber = [number?, number?]

const TOTAL_DIGITS = 10;
const TOTAL_DIGIT_SLOTS = 2;
 

export default function Urn() {

	const [electoralNumber, setElectoralNumber] = React.useState<ElectoralNumber>([]);
	const [indexDigit, setIndexDigit] = React.useState(0);
	const [selectedCandidate, setSelectedCandidate] = React.useState<ICandidate>();

	const pressDigit = async (pressedDigit: number) => {
		const newElectoralNumber: ElectoralNumber = [...electoralNumber];
		newElectoralNumber[indexDigit] = pressedDigit;
		setElectoralNumber(newElectoralNumber);

		if (indexDigit < TOTAL_DIGIT_SLOTS) {
			setIndexDigit(indexDigit + 1);
		}
	}

	const fetchSelectedCandidate = useCallback(async () => {
		if (TOTAL_DIGIT_SLOTS === electoralNumber.length) {
			const { getCandidateByElectoralNumber } = new CandidateService();
			const candidate = await getCandidateByElectoralNumber(parseInt(`${electoralNumber[0]}${electoralNumber[1]}`));
			setSelectedCandidate(candidate);
		} else {
			setSelectedCandidate(undefined);
		}
	}, [electoralNumber])

	const eraseDigits = () => { 
		setElectoralNumber([])
		setIndexDigit(0);
	 }

	const submitVote = () => {
		const { voteCandidate } = new CandidateService();
		const parsedElectoralNumber = parseInt(`${electoralNumber[0]}${electoralNumber[1]}`)
		voteCandidate(parsedElectoralNumber);
		eraseDigits();
	}

	useEffect(() => { fetchSelectedCandidate() }, [electoralNumber, fetchSelectedCandidate])
	
	return (
		<div>
			<div>				
				<h3>SEU VOTO PARA</h3>
				<h2>PREFEITO(A)</h2>
				<div>
					<span>Número:</span>
					<span>{ electoralNumber[Digits.First] }</span>
					<span>{ electoralNumber[Digits.Second] }</span>
				</div>
				<div>
					<span>Nome: {selectedCandidate?.fullName}</span>
				</div>
				<div>
					<span>Partido: {}</span>
				</div>
				<div>
					<span>Vice-Prefeito: {selectedCandidate?.viceCandidateName}</span>
				</div>
			</div>
			<div>
				<div>
					{ 
						Array.from({ length: TOTAL_DIGITS }).map((_, i) => 
							<button key={ i } onClick={ () => { pressDigit(i) } }>{ i }</button>
						)
					}
				</div>
				<div>
					<button>Branco</button>
					<button onClick={ eraseDigits } >Corrige</button>
					<button onClick={ submitVote }>Confirma</button>
				</div>
			</div>
		</div>
	)
}
