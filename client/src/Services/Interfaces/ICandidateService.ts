import ICandidate from '../../Models/Interfaces/ICandidate';

interface ICandidateService {
	getCandidates(): Promise<ICandidate[]>;
	addCandidate(candidate: ICandidate): void;
}

export default ICandidateService;