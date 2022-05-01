import React from 'react';
import MayorRegisterForm from '../Components/MayorRegisterForm';
import Candidate from '../Models/Candidate';

export default function MayorRegisterPage() {
  const [candidateModel] = React.useState(new Candidate());

  return (
    <main>
      <MayorRegisterForm candidateModel={ candidateModel } />
    </main>
  );
}
