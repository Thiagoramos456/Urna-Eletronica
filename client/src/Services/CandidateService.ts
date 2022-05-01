
import ApiEndpoints from '../ApiEndpoints';
import ICandidate from '../Models/Interfaces/ICandidate';
import ICandidateService from './Interfaces/ICandidateService';

export default class CandidateService implements ICandidateService {
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
	public async getCandidates(): Promise<ICandidate[]> {
		const response = await fetch(ApiEndpoints.VOTES_ENDPOINT);
		console.log(response);
		const candidates = await response.json();
		
		return candidates;
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
}