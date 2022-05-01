
import ApiEndpoints from '../ApiEndpoints';
import ICandidate from '../Models/Interfaces/ICandidate';
import ICandidateService from './Interfaces/ICandidateService';

export default class CandidateService implements ICandidateService {
	public async getCandidates(): Promise<ICandidate[]> {
		const response = await fetch(ApiEndpoints.VOTES_ENDPOINT);
		const candidates = await response.json();
		
		return candidates;
	}

	public async getCandidateByElectoralNumber(electoralNumber: number): Promise<ICandidate> {
		const response = await fetch(ApiEndpoints.CANDIDATES_ENDPOINT + '?electoralNumber=' + electoralNumber);
		const candidate = await response.json();

		return candidate;
		
	}

	public async deleteCandidate(candidateId: number): Promise<void> {
		await fetch(ApiEndpoints.CANDIDATES_ENDPOINT, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(candidateId)
		});
	}

	

	public async addCandidate(candidate: ICandidate): Promise<void> {
		await fetch(ApiEndpoints.CANDIDATES_ENDPOINT, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(candidate)
		});
	}

	public async voteCandidate(candidateId: number): Promise<void> {
		await fetch(ApiEndpoints.VOTES_ENDPOINT, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(candidateId)
		});
	}
}