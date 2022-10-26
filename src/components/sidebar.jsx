import { FrequentLetters } from '../components/frequentLetters/frequentLetters';
import { Results } from '../components/results';

export const Sidebar = ({ possibleWords, mostFrequentLetters }) => (
  <aside>
    {mostFrequentLetters.length > 0 && (
      <FrequentLetters mostFrequentLetters={mostFrequentLetters} />
    )}
    <p>
      <strong>Possible words</strong>: {possibleWords.length}
    </p>
    {possibleWords.length < 500 && <Results possibleWords={possibleWords} />}
  </aside>
);
