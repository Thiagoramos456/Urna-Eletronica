import ICandidate from './Interfaces/ICandidate';

export default class Candidate implements ICandidate {
	constructor(
		public id?: number,
		public fullName?: string,
		public viceCandidateName?: string,
		public electoralNumber?: number
	) {}
}
