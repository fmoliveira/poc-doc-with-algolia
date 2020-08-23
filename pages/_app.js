import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <a href="https://github.com/fmoliveira/poc-doc-with-algolia" style={{ position: 'absolute', top: 0, right: 0 }}>
        <img loading="lazy" width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149" class="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1" />
      </a>
    </>
  );
}

export default MyApp
