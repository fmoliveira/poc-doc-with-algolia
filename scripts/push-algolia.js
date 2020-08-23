require('dotenv').config()

const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);

// normalizes the docs.json file to a flat array
const flattenContent = (items)  => {
  const result = [];
  
  items.forEach(item => {
    const { slug, title, text, children } = item;

    result.push({ objectID: slug, title, text });

    if (children) {
      result.push(...flattenContent(children));
    }
  });

  return result;
}

// executes data push to algolia api
const pushData = async () => {
  const index = client.initIndex('dev_documentation');

  const docs = flattenContent(require('../content/docs.json'));
  await index.saveObjects(docs);

  console.log('Process finished successfully!');
}

pushData();
