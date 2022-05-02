import React, { useCallback, useEffect } from 'react';
import ICandidate from '../Models/Interfaces/ICandidate';
import CandidateService from '../Services/CandidateService';
import './Styles/urn.css';

enum Digits {
  First,
  Second,
}

type ElectoralNumber = [number?, number?];

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const TOTAL_DIGIT_SLOTS = 2;

export default function Urn() {
  const [electoralNumber, setElectoralNumber] = React.useState<ElectoralNumber>(
    []
  );
  const [indexDigit, setIndexDigit] = React.useState(0);
  const [selectedCandidate, setSelectedCandidate] =
    React.useState<ICandidate>();

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
      setSelectedCandidate(candidate);
      toggleInfoDisplay(true);
    } else {
      setSelectedCandidate(undefined);
      toggleInfoDisplay(false);
    }
  }, [electoralNumber]);

  const eraseDigits = () => {
    setElectoralNumber([]);
    setIndexDigit(0);
    toggleInfoDisplay(false);
  };

  const submitVote = () => {
    const { voteCandidate } = new CandidateService();
    const parsedElectoralNumber = parseInt(
      `${electoralNumber[0]}${electoralNumber[1]}`
    );
    voteCandidate(parsedElectoralNumber);
    eraseDigits();
  };

  const toggleInfoDisplay = (show: boolean) => {
    const candidateInfoHtml = document.querySelectorAll('.after-selected');
    candidateInfoHtml.forEach((el) => {
      if (show) el.classList.remove('invisible');
      else el.classList.add('invisible');
    });
  };

  useEffect(() => {
    fetchSelectedCandidate();
  }, [electoralNumber, fetchSelectedCandidate]);

  return (
    <div className='urn'>
      <div className='vote-display'>
        <div className='screen'>
          <h4 className='after-selected'>SEU VOTO PARA</h4>
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
          <div className='urn-data after-selected'>
            <span>Nome: {selectedCandidate?.fullName}</span>
          </div>
					<div className='urn-data after-selected'>
            <span>Vice-Prefeito: {selectedCandidate?.viceCandidateName}</span>
          </div>
          <div className='urn-data after-selected'>
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
  );
}
