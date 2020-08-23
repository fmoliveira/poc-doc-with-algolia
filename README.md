# Poc Doc with Algolia

Proof of concept of integrating a single page doc with Algolia Search.

See live demo at https://poc-doc-with-algolia.vercel.app/

## Usage

Make a copy of `.env.example` as `.env` and input your Algolia credentials.

Modify the file `content/docs.json` to update the content displayed on the sample docs page. This file just illustrates that in a real world scenario we'll have to consolidate all the content to be pushed to Algolia API in order to make it searchable.

To push the contents of this file to Algolia API, run `yarn push-algolia`.

Then start the project with `yarn dev` and go to http://localhost:3000 to use the search UI.

## Useful Resources

- [Adding Search with Algolia](https://www.gatsbyjs.com/docs/adding-search-with-algolia/) does a really good job on helping setup a custom UI to integrate with Algolia InstantSearch
