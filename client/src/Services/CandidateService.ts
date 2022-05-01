
import ApiEndpoints from '../ApiEndpoints';
import ICandidate from '../Models/Interfaces/ICandidate';
import ICandidateService from './Interfaces/ICandidateService';

export default class CandidateService implements ICandidateService {
	public async getCandidates(): Promise<ICandidate[]> {
		const response = await fetch(ApiEndpoints.CANDIDATES_ENDPOINT);
		const candidates = await response.json();
		return candidates;
	}

	public async addCandidate(candidate: ICandidate): Promise<void> {
		console.log(candidate);
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