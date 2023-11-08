'use client';

import PageContext from './contexts/pageContext';

import { Header } from './components/header';
import { Guess } from './components/guess';
import { FrequentLetters } from './components/frequentLetters';
import { Letters } from './components/letters';
import { Results } from './components/results';

export default function Home() {
  return (
    <PageContext>
      <div className='mt-8'>
        <Header />
        <main className='mt-8'>
          <Guess />
          <Letters />
        </main>
        <aside className='mt-8'>
          <FrequentLetters />
          <Results />
        </aside>
      </div>
    </PageContext>
  );
}
