# Xeno Canto API

> A TypeScript wrapper for the [Xeno Canto](https://xeno-canto.org/) API with no dependencies.

[![NPM Version](https://img.shields.io/npm/v/xeno-canto-api-ts)](https://www.npmjs.com/package/xeno-canto-api-ts) [![GitHub Release](https://img.shields.io/github/v/release/JoeSiu/xeno-canto-api-ts)](https://github.com/JoeSiu/xeno-canto-api-ts/releases/latest) [![npm bundle size](https://img.shields.io/bundlephobia/min/xeno-canto-api-ts)](https://www.npmjs.com/package/xeno-canto-api-ts) [![MIT License](https://img.shields.io/badge/license-GPL-blue)](https://github.com/JoeSiu/xeno-canto-api-ts/blob/main/LICENSE) [![Build Status](https://github.com/JoeSiu/xeno-canto-api-ts/actions/workflows/ci.yaml/badge.svg)](https://github.com/JoeSiu/xeno-canto-api-ts/actions/workflows/ci.yaml) [![GitHub Repo stars](https://img.shields.io/github/stars/JoeSiu/xeno-canto-api-ts)](https://github.com/JoeSiu/xeno-canto-api-ts)

## Introduction

A Node.js implementation with TypeScript support for the [xeno-canto.org](https://xeno-canto.org) API 2.0. It provides an easy way to search for various bird and wildlife sound recordings.

## Install

To install, run the following command in your terminal:

```bash
npm install xeno-canto-api-ts
```

## Usage

### Import

To use `xeno-canto-api-ts` in your Node.js project, you need to import it as follows:

```ts
import * as XenoCanto from "xeno-canto-api-ts";
```

or

```ts
const XenoCanto = require('xeno-canto-api-ts');
```

### Simple Search

You can pass a string query to the `search` method like this:

```ts
const result = await XenoCanto.search("Owl");
// Do something with result
```

or

```ts
XenoCanto.search("Owl").then((result) => {
  // Do something with result
});
```

If the search is successful, the `search` method will return an object with the following properties:

* `url`: The query URL used for the search
* `rawResponse`: The original Response object from the fetch
* `xrResponse`: An `XCResponse` object that contains the fetched data

You can access the data like this:

```ts
console.log(result.rawResponse.status) //Response status code, e.g., 200
console.log(result.xcResponse.numRecordings) // Total number of recordings
console.log(result.xcResponse.recordings[0].file) // The first recording result's sound file download URL
```

### Advanced Search

You can pass a `XCQueryOption` object to the `search` method like this:

```ts
// Create query and options
const query = "Eagle";
const options = {
  grp: "birds",
  cnt: "United States",
  // ...
} as XenoCanto.XCQueryOption;

const result = await XenoCanto.search(query, options);
```

* Some of the `XCQueryOption` properties accepts operators such as `=`, `>`, `<` or `-`. For example, the recording length property `len` can accept `10`, `">120"` or `"=19.8"`.
* The options list can accept additional properties that are not specified in the current API documentation in case of future updates. Note that the API will disregard any non-existing query parmeters.

#### Multiple Pages

For results that have multiple pages, you can pass the `page` parameter to the `search` method:

```ts
// Create query and options
const query = "Eagle";
const options = {
  grp: "birds",
  cnt: "United States",
  // ...
} as XenoCanto.XCQueryOption;

// Begin initial search
console.log("Fetching page 1...");
const result = await XenoCanto.search(query, options);

// Print first recording data from response
console.log(result.xcResponse.recordings[0]);

// Wait for 1 second (to prevent rate limit)
await new Promise((resolve) => setTimeout(resolve, 1000));

// Check if there are more pages
const numPages = result.xcResponse.numPages;
if (numPages > 1) {
  // Loop through rest of the pages
  for (let page = 2; page < numPages; page++) {
    // Begin next search
    console.log(`Fetching page ${page}/${numPages}...`);
    const result = await XenoCanto.search(query, options, page); // Here we pass the original query and options with a new page

    // Print first recording data from response
    console.log(result.xcResponse.recordings[0]);

    // Wait for 1 second (to prevent rate limit)
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
```

### Additional Options

The wrapper also provides additional options by passing a `AdditionalWrapperOption` object to the `search` method

#### Change API Base URL

For development purpose, the Base URL can be changed as follows:

```ts
// Create query and options
const query = "Owl";
const options = {} as XenoCanto.XCQueryOption;
const additionalOptions = {
  baseUrl: "https://run.mocky.io/v3/9f08db9a-cfba-4b1d-8c4a-765932f6cf3b?query=", // A fake JSON server URL
} as XenoCanto.AdditionalWrapperOption;

const result = await XenoCanto.search(query, options, 1, additionalOptions);
```

#### Custom Data Fetching

If you wish to implement your own data retrieval methods instead of using the Fetch API, you can utilize the `convertJsonToXCResponse` method by passing the JSON response:

```ts
const xcResponse = XenoCanto.convertJsonToXCResponse(json);
```

## Limitation

Due to the API limitation, only English queries are supported, and the query should based on scientific or common names. You may refer to the [IOC World Bird List - Multilingual Version](https://www.worldbirdnames.org/new/ioc-lists/master-list-2/) for looking up and mapping the corresponding names.

## Resources

Please refer to the [documentation](https://joesiu.github.io/xeno-canto-api-ts/) for details and API references.

To learn more about the Xeno Canto's query parmeters, see [https://xeno-canto.org/explore/api](https://xeno-canto.org/explore/api) and [https://xeno-canto.org/help/search](https://xeno-canto.org/help/search).
