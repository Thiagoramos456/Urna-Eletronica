import ICandidate from './Interfaces/ICandidate';

export default class Candidate implements ICandidate {
	constructor(
		public fullName: string = '',
		public viceCandidateName: string = '',
		public electoralNumber: number = 0,
		public id: number = 0
	) {}
}
