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

### Simple Search

You can pass a string query to the `search` method like this:

```ts
const result = await XenoCanto.search({ query: "Owl" });
// Do something with result
```

or

```ts
XenoCanto.search({ query: "Owl" }).then((result) => {
  // Do something with result
});
```

If the search is successful, the `search` method will return an object with the following properties:

- `url`: The query URL used for the search
- `rawResponse`: The original Response object from the fetch
- `xrResponse`: An `XCResponse` object that contains the fetched data

You can access the data like this:

```ts
console.log(result.rawResponse.status); //Response status code, e.g., 200
console.log(result.xcResponse.numRecordings); // Total number of recordings
console.log(result.xcResponse[XCResponseKey.numRecordings]); // Same as above, but use the defined enum as key
console.log(result.xcResponse.recordings[0].file); // The first recording result's sound file download URL
console.log(result.xcResponse[XCResponseKey.recordings][0][XCRecordingKey.file]); // Same as above, but use the defined enum as key
```

### Advanced Search

You can pass a `XCQueryOption` object to the `search` method like this:

```ts
// Create options
const options: XenoCanto.XCQueryOption = {
  query: "Eagle", // Required
  grp: "birds", // Optional
  cnt: "United States", // Optional
  // ...
};

const result = await XenoCanto.search(options);
```

- Some of the `XCQueryOption` properties accepts operators such as `=`, `>`, `<` or `-`. For example, the recording length property `len` can accept `10`, `">120"` or `"=19.8"`.
- The options list can accept additional properties that are not specified in the current API documentation in case of future updates. Note that the API will disregard any non-existing query parmeters.

#### Multiple Pages

For results that have multiple pages, you can pass the `page` parameter to the `search` method:

```ts
// Create options
const options: XenoCanto.XCQueryOption = {
  query: "Eagle",
  grp: "birds",
  cnt: "United States",
  // ...
};

// Begin initial search
console.log("Fetching page 1...");
const result = await XenoCanto.search(options);

// Print first recording data from response
console.log(result.xcResponse.recordings[0]);

// Wait for 1 second (to prevent rate limit)
await new Promise((resolve) => setTimeout(resolve, 1000));

// Check if there are more pages
const totalPages = result.xcResponse.numPages;
if (numPages > 1) {
  // Loop through rest of the pages
  for (let currentPage = 2; currentPage < totalPages; currentPage++) {
    // Begin next search
    console.log(`Fetching page ${currentPage}/${totalPages}...`);
    const result = await XenoCanto.search({ ...options, page: currentPage }); // Here we pass the original query and options with a new page

    // Print first recording data from response
    console.log(result.xcResponse.recordings[0]);

    // Wait for 1 second (to prevent rate limit)
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
```

### Additional Options

The wrapper also provides additional options by passing a `AdditionalSearchOption` object to the `search` method

#### Change API Base URL

For development purpose, the Base URL can be changed as follows:

```ts
// Create options
const options: XenoCanto.XCQueryOption = {
  query: "Owl",
};
const additionalOptions: XenoCanto.AdditionalSearchOption = {
  baseUrl: "https://run.mocky.io/v3/9f08db9a-cfba-4b1d-8c4a-765932f6cf3b", // A custom URL that will return a example JSON data
};

const result = await XenoCanto.search(options, additionalOptions);
```

### Other Usages

#### Custom Data Fetching

If you wish to implement your own data retrieval methods instead of using the default Fetch API, you can utilize the `constructQueryUrl` and `convertJsonToXCResponse` methods:

```ts
const options: XenoCanto.XCQueryOption = {
  query: "Owl",
};
const customUrl = XenoCanto.constructQueryUrl("/custom-endpoint/", options); // This will returns string `/custom-endpoint/?query="Owl"`
// Your implementation to retrieve the JSON data...
const xcResponse = XenoCanto.convertJsonToXCResponse(json); // If the JSON format is correct, this will convert it to type `XCResponse` which has type hinting
```

#### Query Parameters / Response's Key Names

To get the query parameters names / response JSON key names of the Xeno Canto API, you can use the `XCQueryNameDefinition`, `XCResponseNameDefinition` and `XCRecordingNameDefinition` enum, for example, `XCQueryNameDefinition.rec`will return the string `rec`.

## Limitation

Due to the API limitation, only English queries are supported, and the query should based on scientific or common names. You may refer to the [IOC World Bird List - Multilingual Version](https://www.worldbirdnames.org/new/ioc-lists/master-list-2/) for looking up and mapping the corresponding names.

## Resources

Please refer to the [documentation](https://joesiu.github.io/xeno-canto-api-ts/) for details and API references.

To learn more about the Xeno Canto's query parmeters, see [https://xeno-canto.org/explore/api](https://xeno-canto.org/explore/api) and [https://xeno-canto.org/help/search](https://xeno-canto.org/help/search).

To build this package from source, please refer to the [wiki](https://github.com/JoeSiu/xeno-canto-api-ts/wiki) page.
