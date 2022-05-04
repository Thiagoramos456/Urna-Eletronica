import React from 'react'
import { toast } from 'react-toastify';
import ErrorResponse from '../../../ErrorResponse';
import Candidate from '../../../Models/Candidate';
import ICandidateFormState from '../Interfaces/ICandidateFormState';
import CandidateService from '../../../Services/CandidateService';
import ICandidateRegisterFormProps from '../../../Components/Interfaces/ICandidatRegisterFormProps'

const DEFAULT_FORM = {
  fullName: '',
  viceFullName: '',
  party:'',
  electoralNumber: 10,
}

export default function CandidateRegisterForm({ refreshCandidateList }: ICandidateRegisterFormProps) {
	
  const [formState, setFormState] = React.useState<ICandidateFormState>(DEFAULT_FORM);


	const submitCandidate = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    const candidateService = new CandidateService();
  
    const { fullName, viceFullName, electoralNumber, party } = formState;
    const candidateModel = new Candidate(fullName, viceFullName, party ,electoralNumber);
    const response = await candidateService.addCandidate(candidateModel);

    if (response instanceof ErrorResponse) {
      return toast.error(response.ErrorMessage);
    }

    refreshCandidateList();
    setFormState(DEFAULT_FORM);
    toast.success('Candidato cadastrado com sucesso!');

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
          <label htmlFor='party'>Partido:</label>
          <input
            onChange={(e) => {
              setFormState({ ...formState, party: e.target.value })
            }}
						value={ formState.party }
            type='text'
            id='party'
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
            min="10"
            max="99"
            required
          />
        </div>
        <button type='submit'>Cadastrar</button>
      </form>
	)
}