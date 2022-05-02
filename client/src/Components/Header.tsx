import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'>Votar</Link>
          </li>
          <li>
            <Link to='/register'>Gerenciar Prefeitos</Link>
          </li>
          <li>
            <Link to='/dashboard'>Dados</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
