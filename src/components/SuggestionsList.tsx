import { City } from '../types';
import { css } from '@emotion/react'

interface SuggestionsListProps {
  cities: City[];
  searchTerm: string;
}

const style = css`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    margin: 0;
    padding: 20px;
    border-top: 2px solid #f0f0f0;
    font-size: 24px;
  }

  .name {
    font-weight: bold;
  }

  .population {
    font-size: 18px;
    color: #666;
  }

  .highlight {
    background: #ffdc8a;
  }

  /* Mobile styles */

  @media (max-width: 600px) {
    li {
      flex-direction: column;
    }

    .name,
    .population {
      text-align: center;
      width: 100%;
    }
  }
`

function highlightMatch(text: string, searchTerm: string) {
  const regex = new RegExp(searchTerm, 'gi');
  return text.replace(regex, match => `<span class="highlight">${match}</span>`);
}

function SuggestionsList({ cities, searchTerm }: SuggestionsListProps) {
  return (
    <ul css={style}>
      {cities.map(city => (
        <li key={city.rank}>
          <span className="name" dangerouslySetInnerHTML={{ __html: highlightMatch(city.city, searchTerm) + ', ' + highlightMatch(city.state, searchTerm) }}></span>
          <span className="population">{city.population}</span>
        </li>
      ))}
    </ul>
  );
}

export default SuggestionsList;
