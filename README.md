# react-native-pdf-helpers

A set of helpers to work with pdfs:
- generateThumbnail: generates a thumbnail from a given uri
- getPageCount: get the number of pages for a given uri

## Installation

```sh
npm install react-native-pdf-helpers
```

## Usage

```js
import { generateThumbnail, getPageCount } from 'react-native-pdf-helpers';

const thumbnail = await generateThumbnail(uri, 0, 100); // Generates a thumbnail from a given URI, for the first page of the document and at the highest quality.

const pageCount = await getPageCount(uri);
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
