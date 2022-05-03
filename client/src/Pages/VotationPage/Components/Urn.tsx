import React, { useCallback, useEffect, useState } from 'react';
import ErrorResponse from '../../../ErrorResponse';
import ICandidate from '../../../Models/Interfaces/ICandidate';
import CandidateService from '../../../Services/CandidateService';
import { toast } from 'react-toastify';
import UrnHelper from '../Helpers/UrnHelper';

import '../Styles/urn.css';

export default function Urn() {
  const [selectedCandidate, setSelectedCandidate] =
    useState<ICandidate>();
  const [showEndScreen, setShowEndScreen] = useState(false);

  const [firstDigit, setFirstDigit] = useState<number>();
  const [secondDigit, setSecondDigit] = useState<number>();
  const [electoralNumber, setElectoralNumber] = useState<number>();
  const [indexDigit, setIndexDigit] = useState<number>(0);

  const pressDigit = async (pressedDigit: number) => {
    if (indexDigit === 0) {
      setFirstDigit(pressedDigit);
    } else if (indexDigit === 1) {
      setSecondDigit(pressedDigit);
    }

    setIndexDigit(indexDigit + 1);
  };

  const eraseAll = () => {
    setFirstDigit(undefined);
    setSecondDigit(undefined);
    setElectoralNumber(undefined);
    setSelectedCandidate(undefined);
    setIndexDigit(0);
  };

  const fetchSelectedCandidate = useCallback(async () => {
    const { getCandidateByElectoralNumber } = new CandidateService();
    const candidate = await getCandidateByElectoralNumber(
      UrnHelper.ParseDigits(firstDigit, secondDigit)
    );

    if (candidate instanceof ErrorResponse) {
      return toast.error(candidate.ErrorMessage);
    }

    setSelectedCandidate(candidate as ICandidate);
  }, [firstDigit, secondDigit]);

  const submitVote = async () => {
    const { voteCandidate } = new CandidateService();

    if (!UrnHelper.IsVoteValid(electoralNumber)) {
      return toast.error('Número de eleitor inválido');
    }

    const response = await voteCandidate(electoralNumber as number);

    if (response instanceof ErrorResponse) {
      return toast.error(response.ErrorMessage);
    }

    toast.success('Voto registrado com sucesso!');
    eraseAll();
  };

  useEffect(() => {
    setElectoralNumber(UrnHelper.ParseDigits(firstDigit, secondDigit));
    if (UrnHelper.IsVoteValid(electoralNumber)) {
      fetchSelectedCandidate();
    }
  }, [electoralNumber, fetchSelectedCandidate, firstDigit, secondDigit]);

  return (
    <>
      <div className='urn'>
        <div className='vote-display'>
          <div className='screen'>
            <h4 className={selectedCandidate ? ' show' : ' hide'}>
              SEU VOTO PARA
            </h4>
            <h2 className='mayor-title'>PREFEITO(A)</h2>
            <div className='electoral-number'>
              <span className='urn-data after-selected'>Número:</span>
              <div className='slots'>
                <div className='digit-slot'>
                  <span>{firstDigit}</span>
                </div>
                <div className='digit-slot'>
                  <span>{secondDigit}</span>
                </div>
              </div>
            </div>
            <div
              className={
                'candidate-data' + (selectedCandidate ? ' show' : ' hide')
              }
            >
              <span>Nome: {selectedCandidate?.fullName}</span>
            </div>
            <div
              className={
                'candidate-data' + (selectedCandidate ? ' show' : ' hide')
              }
            >
              <span>Vice-Prefeito: {selectedCandidate?.viceCandidateName}</span>
            </div>
            <div
              className={
                'candidate-data' + (selectedCandidate ? ' show' : ' hide')
              }
            >
              <span>Partido: {selectedCandidate?.party}</span>
            </div>
          </div>
        </div>
        <div className='keyboard-area'>
          <div className='keyboard-numbers'>
            {UrnHelper.NumpadDigits.map((digit) => (
              <button
                className='keyboard-digit'
                key={digit}
                onClick={() => {
                  pressDigit(digit);
                }}
              >
                {digit}
              </button>
            ))}
          </div>
          <div className='action-btns'>
            <button className='white-btn'>Branco</button>
            <button className='erase-btn' onClick={eraseAll}>
              Corrige
            </button>
            <button className='confirm-btn' onClick={submitVote}>
              Confirma
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
