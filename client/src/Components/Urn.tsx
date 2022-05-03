import React, { useCallback, useEffect } from 'react';
import ErrorResponse from '../ErrorResponse';
import ICandidate from '../Models/Interfaces/ICandidate';
import CandidateService from '../Services/CandidateService';
import { Digits, ElectoralNumber } from './Types/UrnTypes';
import { toast } from 'react-toastify';

import './Styles/urn.css';
import toggleInfoDisplay from '../Utils/toggleUrnCandidatesInfo';

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const TOTAL_DIGIT_SLOTS = 2;

export default function Urn() {
  const [electoralNumber, setElectoralNumber] = React.useState<ElectoralNumber>(
    []
  );
  const [indexDigit, setIndexDigit] = React.useState(0);
  const [selectedCandidate, setSelectedCandidate] = React.useState<ICandidate>();

  const pressDigit = async (pressedDigit: number) => {
    const newElectoralNumber: ElectoralNumber = [...electoralNumber];
    newElectoralNumber[indexDigit] = pressedDigit;
    setElectoralNumber(newElectoralNumber);

    if (indexDigit < TOTAL_DIGIT_SLOTS) {
      setIndexDigit(indexDigit + 1);
    }
  };

  const fetchSelectedCandidate = useCallback(async () => {
    if (TOTAL_DIGIT_SLOTS === electoralNumber.length) {
      const { getCandidateByElectoralNumber } = new CandidateService();
      const candidate = await getCandidateByElectoralNumber(
        parseInt(`${electoralNumber[0]}${electoralNumber[1]}`)
      );

      if (candidate instanceof ErrorResponse) {
        return toast.error(candidate.ErrorMessage);
      }

      setSelectedCandidate(candidate as ICandidate);
      toggleInfoDisplay(true);
    }
  }, [electoralNumber]);

  const eraseDigits = () => {
    setElectoralNumber([]);
    setIndexDigit(Digits.First);
    toggleInfoDisplay(false);
  };

  const submitVote = async () => {
    const { voteCandidate } = new CandidateService();
    const parsedElectoralNumber = parseInt(
      `${electoralNumber[0]}${electoralNumber[1]}`
    );
    const response = await voteCandidate(parsedElectoralNumber);

    if (response instanceof ErrorResponse) {
      return toast.error(response.ErrorMessage);
    }
    
    eraseDigits();
    toast.success('Voto registrado com sucesso!');
  };

  useEffect(() => {
    fetchSelectedCandidate();
  }, [electoralNumber, fetchSelectedCandidate]);

  return (
    <>
      <div className='urn'>
        <div className='vote-display'>
          <div className='screen'>
            <h4 className='after-selected invisible'>SEU VOTO PARA</h4>
            <h2 className='mayor-title'>PREFEITO(A)</h2>
            <div className='electoral-number'>
              <span className='urn-data after-selected'>Número:</span>
              <div className='slots'>
                <div className='digit-slot'>
                  <span>{electoralNumber[Digits.First]}</span>
                </div>
                <div className='digit-slot'>
                  <span>{electoralNumber[Digits.Second]}</span>
                </div>
              </div>
            </div>
            <div className='urn-data after-selected invisible'>
              <span>Nome: {selectedCandidate?.fullName}</span>
            </div>
            <div className='urn-data after-selected invisible'>
              <span>Vice-Prefeito: {selectedCandidate?.viceCandidateName}</span>
            </div>
            <div className='urn-data after-selected invisible'>
              <span>Partido: {selectedCandidate?.party}</span>
            </div>
          </div>
        </div>
        <div className='keyboard-area'>
          <div className='keyboard-numbers'>
            {DIGITS.map((digit) => (
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
            <button className='erase-btn' onClick={eraseDigits}>
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
