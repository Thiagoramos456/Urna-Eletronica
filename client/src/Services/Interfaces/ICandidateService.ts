import ICandidate from '../../Models/Interfaces/ICandidate';

interface ICandidateService {
	getCandidates(): Promise<ICandidate[]>;
	getCandidateByElectoralNumber(electoralNumber: number): Promise<ICandidate>;
	addCandidate(candidate: ICandidate): void;
	deleteCandidate(candidateId: number): void;
	voteCandidate(electoralNumber: number): void;
}

export default ICandidateService;