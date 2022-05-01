import React from 'react'
import Candidate from '../Models/Candidate';
import ICandidateFormState from '../Pages/Interfaces/ICandidateFormState';
import CandidateService from '../Services/CandidateService';
import ICandidateRegisterFormProps from './Interfaces/ICandidatRegisterFormProps'

export default function CandidateRegisterForm({ refreshCandidateList }: ICandidateRegisterFormProps) {
	
  const [formState, setFormState] = React.useState<ICandidateFormState>({
    fullName: '',
    viceFullName: '',
    electoralNumber: 0
  });


	const submitCandidate = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    const candidateService = new CandidateService();
  
    const { fullName, viceFullName, electoralNumber } = formState;
    const candidateModel = new Candidate(fullName, viceFullName, electoralNumber);
    await candidateService.addCandidate(candidateModel);

    refreshCandidateList();
  };

	return (
		<form onSubmit={ submitCandidate }>
        <div>
          <label htmlFor='name'>Nome completo:</label>
          <input
            onChange={(e) => {
              setFormState({ ...formState, fullName: e.target.value })
            }}
						value={ formState.fullName }
            type='text'
            id='full-name'
            required
          />
        </div>
        <div>
          <label htmlFor='vice-name'>Nome do vice:</label>
          <input
            onChange={(e) => {
              setFormState({ ...formState, viceFullName: e.target.value })
            }}
						value={ formState.viceFullName }
            type='text'
            id='vice-name'
            required
          />
        </div>
        <div>
          <label htmlFor='electoral-number'>Número de votação (legenda):</label>
          <input
            onChange={(e) => {
              setFormState({ ...formState, electoralNumber: parseInt(e.target.value) })
            }}
						value={ formState.electoralNumber }
            type='number'
            id='electoral-number'
            required
          />
        </div>
        <button type='submit'>Cadastrar</button>
      </form>
	)
}
