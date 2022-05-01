import React from 'react'
import CandidateService from '../Services/CandidateService';
import IMayorRegisterFormProps from './Interfaces/IMayorRegisterFormProps'

export default function MayorRegisterForm({ candidateModel }: IMayorRegisterFormProps) {
	const candidateService = new CandidateService();

	const submitCandidate = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    candidateService.addCandidate(candidateModel) 
  };

	return (
		<form onSubmit={ submitCandidate }>
        <div>
          <label htmlFor='name'>Nome completo:</label>
          <input
            onChange={(e) => candidateModel.fullName = e.target.value}
						value={ candidateModel.fullName }
            type='text'
            id='full-name'
            required
          />
        </div>
        <div>
          <label htmlFor='vice-name'>Nome do vice:</label>
          <input
            onChange={(e) => candidateModel.viceCandidateName = e.target.value}
						value={ candidateModel.viceCandidateName }
            type='text'
            id='vice-name'
            required
          />
        </div>
        <div>
          <label htmlFor='electoral-number'>Número de votação (legenda):</label>
          <input
            onChange={(e) => candidateModel.electoralNumber = parseInt(e.target.value)}
						value={ candidateModel.electoralNumber }
            type='number'
            id='electoral-number'
            required
          />
        </div>
        <button type='submit'>Cadastrar</button>
      </form>
	)
}
