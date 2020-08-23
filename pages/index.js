import Head from 'next/head'

import docs from '../content/docs.json'

import SearchBar from '../components/SearchBar';
import styles from '../styles/Home.module.css'

const INDENT_SIZE = 40;

const Documentation = ({ items, indent = 0 }) =>
  items.map(item => (
    <div>
        <a id={item.slug} href={`#${item.slug}`}>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </a>
      {item.children && (
        <div style={{ marginLeft: indent + INDENT_SIZE}}>
          <Documentation items={item.children} indent={indent} />
        </div>
      )}
    </div>
  ))

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Poc Doc</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a id="top" href="#top">
            Poc Doc
          </a>
        </h1>

        <SearchBar/>
    
        <p className={styles.description}>
          Proof of concept of integrating a single page doc with Algolia Search
        </p>

        <div className={styles.grid}>
          <Documentation items={docs} />
        </div>
      </main>

      <footer className={styles.footer}>
        This space was intentionally left blank to help testing the anchor links.
      </footer>
    </div>
  )
}
