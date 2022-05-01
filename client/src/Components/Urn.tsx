import React from 'react'
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

	const pressDigit = (pressedDigit: number) => {
		const newElectoralNumber: ElectoralNumber = [...electoralNumber];
		newElectoralNumber[indexDigit] = pressedDigit;
		setElectoralNumber(newElectoralNumber);

		if (indexDigit < TOTAL_DIGIT_SLOTS) {
			setIndexDigit(indexDigit + 1);
		} 
	}

	const eraseDigits = () => { 
		setElectoralNumber([])
		setIndexDigit(0);
	 }

	const submitVote = () => {
		const { voteCandidate } = new CandidateService();
		const parsedElectoralNumber = parseInt(`${electoralNumber[0]}${electoralNumber[1]}`)
		voteCandidate(parsedElectoralNumber);
	}
	
	return (
		<div>
			<div>
				<h2>PREFEITO(A)</h2>
				<div>{ electoralNumber[Digits.First] }</div>
				<div>{ electoralNumber[Digits.Second] }</div>
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
