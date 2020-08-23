import React, { createRef, useState } from 'react'
import algoliasearch from 'algoliasearch';
import {
  InstantSearch,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
  connectSearchBox,
  connectStateResults,
} from 'react-instantsearch-dom';

import useClickOutside from './useClickOutside';

import styles from './SearchBar.module.css';

const searchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_API_KEY);
const index = searchClient.initIndex('dev_documentation');

// thanks to the awesome examples from gatsby docs at https://www.gatsbyjs.com/docs/adding-search-with-algolia/

export default function SearchBar({ indices }) {
  const rootRef = createRef()
  const [query, setQuery] = useState()
  const [hasFocus, setFocus] = useState(false)
  useClickOutside(rootRef, () => setFocus(false))

  return (
    <div ref={rootRef} className={styles.container}>
      <InstantSearch
        searchClient={searchClient}
        indexName={index.indexName}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
        {query?.length > 0 && hasFocus && <SearchResults />}
      </InstantSearch>
    </div>
  )
}

const SearchBox = connectSearchBox(
  ({ refine, currentRefinement, className, onFocus }) => (
    <form className={styles.searchBox}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search..."
        onChange={event => refine(event.target.value)}
        value={currentRefinement}
        onFocus={onFocus}
      />
    </form>
  )
);

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits
  return hitCount > 0 ? (
    <div className="HitCount">
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </div>
  ) : null
});

const PageHit = ({ hit }) => (
  <div>
    <a href={`#${hit.objectID}`}>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
        <div className={styles.hitText}>{hit.text}</div>
      </h4>
    </a>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
);

const HitsInIndex = ({ index }) => (
  <Index indexName={index.indexName}>
    <HitCount />
    <Hits className="Hits" hitComponent={PageHit} />
  </Index>
);

const SearchResults = () => (
  <div className={styles.resultsWrapper}>
    <div className={styles.resultsBox}>
      <div className={styles.hitsList}>
        <HitsInIndex index={index} />
      </div>
      <PoweredBy />
    </div>
  </div>
);
