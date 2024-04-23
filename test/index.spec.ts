import { beforeEach, describe, expect, test } from "vitest";
import { AdditionalWrapperOption, XCQueryOption, constructQueryUrl, convertJsonToXCResponse, search } from "../src";

describe("Search function", () => {
  beforeEach(async () => {
    // Add a 1 second delay before calling the API in each test
    return await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  test("Should have response status 200", async () => {
    const options: XCQueryOption = {
      query: "Sparrow"
    }
    const result = await search(options);

    expect(result.rawResponse.status).toBe(200);
  });

  describe("Simple search", () => {
    test("Normal query", async () => {
      const options: XCQueryOption = {
        query: "Sparrow"
      }
      const result = await search(options);

      console.log(`Requested URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.recordings.length).toBeGreaterThan(0);
    });

    test("Wrong query", async () => {
      const options: XCQueryOption = {
        query: "qwertyuiopasdfghjklzxcvbnm"
      }
      const result = await search(options);

      console.log(`Requested URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.recordings.length).toBe(0);
    });

    test("Query with whitespaces", async () => {
      const options: XCQueryOption = {
        query: "   Sparrow   "
      }
      const result = await search(options);

      console.log(`Requested URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.numRecordings).toBeGreaterThan(0);
      expect(result.xcResponse.recordings.length).toBeGreaterThan(0);
    });

    test("Query with quotes", async () => {
      const options: XCQueryOption = {
        query: '"Sparrow"'
      }
      const result = await search(options);

      console.log(`Requested URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.numRecordings).toBeGreaterThan(0);
      expect(result.xcResponse.recordings.length).toBeGreaterThan(0);
    });

    test("Empty query should throw an error", async () => {
      await expect(search({ query: "" })).rejects.toThrowError();
      await expect(search({ query: " " })).rejects.toThrowError();
      await expect(search({ query: "    " })).rejects.toThrowError();
    });
  });

  describe("Advanced search", () => {
    test("Normal query", async () => {
      const options: XCQueryOption = {
        query: "Sparrow",
        grp: "birds",
        cnt: "Brazil",
      };
      const result = await search(options);

      console.log(`Requested URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.numRecordings).toBeGreaterThan(0);
      expect(result.xcResponse.recordings.length).toBeGreaterThan(0);
    });

    test("Query with non-existent tag", async () => {
      const options: XCQueryOption = {
        query: "Sparrow",
        "non-existent-tag": "no",
      };
      const result = await search(options);

      console.log(`Requested URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.numRecordings).toBeGreaterThan(0);
      expect(result.xcResponse.recordings.length).toBeGreaterThan(0);
    });

    test("Empty query with options", async () => {
      const options: XCQueryOption = {
        query: "",
        cnt: "Brazil",
        q: "A",
      };
      const result = await search(options);

      console.log(`Requested URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.numRecordings).toBeGreaterThan(0);
      expect(result.xcResponse.recordings.length).toBeGreaterThan(0);
    });

    test("Query with spaced tag", async () => {
      const options: XCQueryOption = {
        query: "Larus brachyrhynchus",
        cnt: "United States",
        method: "field recording",
      };
      const result = await search(options);

      console.log(`Requested URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.numRecordings).toBeGreaterThan(0);
      expect(result.xcResponse.recordings.length).toBeGreaterThan(0);
    });

    test("Query with non-bird group", async () => {
      const options: XCQueryOption = {
        query: "Wood Cricket",
        grp: "grasshoppers",
      };
      const result = await search(options);

      console.log(`Requested URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.numRecordings).toBeGreaterThan(0);
      expect(result.xcResponse.recordings.length).toBeGreaterThan(0);
    });

    test("Query multiple pages", async () => {
      let currentPage = 1;
      const maxPages = 3;

      const options: XCQueryOption = {
        query: "Sparrow",
        grp: "birds",
      };

      console.log(`Requesting first page: ${currentPage}/${maxPages}`);
      const result = await search({ ...options, page: currentPage });

      console.log(`Requested URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      console.log(`numPages: ${result.xcResponse.numPages}`);

      while (currentPage < maxPages) {
        currentPage++;
        console.log(`Requesting next page: ${currentPage}/${maxPages}`);
        const nextResult = await search({ ...options, page: currentPage });
        console.log(`Requested URL: ${nextResult.url}`);
        console.log(
          `recordings.length: ${nextResult.xcResponse.recordings.length}`,
        );
        expect(nextResult).toBeDefined();
        expect(nextResult.rawResponse).toBeDefined();
        expect(nextResult.xcResponse).toBeDefined();
        expect(nextResult.xcResponse.page).toBe(currentPage);
        expect(nextResult.xcResponse.numRecordings).toBeGreaterThan(0);
        expect(nextResult.xcResponse.recordings.length).toBeGreaterThan(0);

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    });

    test("Query with non-existent page should throw an error", async () => {
      const options: XCQueryOption = {
        query: "Sparrow",
        grp: "birds",
        cnt: "Brazil",
        q: "A",
      };

      await expect(async () => {
        const result = await search(options);
        console.log(`Requested URL: ${result.url}`);
        expect(result).toBeDefined();
        expect(result.rawResponse).toBeDefined();
        expect(result.xcResponse).toBeDefined();
        expect(result.xcResponse.error).toBeDefined();
        expect(result.xcResponse.message).toBeDefined();
      }).rejects.toThrowError();
    });
  });

  describe("Additional options", () => {
    test("Override the default BASE_URL", async () => {
      const options: XCQueryOption = {
        query: "Sparrow",
        grp: "birds",
        cnt: "Brazil",
      };
      const additionalOptions: AdditionalWrapperOption = {
        baseUrl:
          "https://run.mocky.io/v3/9f08db9a-cfba-4b1d-8c4a-765932f6cf3b", // Fake data
      };

      const result = await search(options, additionalOptions);

      console.log(`Requested URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      console.log(`numPages: ${result.xcResponse.numPages}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.numRecordings).toBeGreaterThan(0);
      expect(result.xcResponse.recordings.length).toBeGreaterThan(0);
    });

    test("Custom fetch (URL object)", async () => {
      const baseUrl = "https://run.mocky.io/v3/9f08db9a-cfba-4b1d-8c4a-765932f6cf3b"
      const options: XCQueryOption = {
        query: "Sparrow",
        grp: "birds",
        cnt: "Brazil",
      };

      const url = constructQueryUrl(baseUrl, options);

      const response = await fetch(url);
      const json = await response.json();
      const result = convertJsonToXCResponse(json);

      console.log(`Requested URL: ${url}`);
      console.log(`numRecordings: ${result.numRecordings}`);
      console.log(`numPages: ${result.numPages}`);
      expect(result).toBeDefined();
      expect(result.numRecordings).toBeGreaterThan(0);
      expect(result.recordings.length).toBeGreaterThan(0);
    });

    test("Custom fetch (non-valid URL object input)", async () => {
      const baseUrl = "/api/xeno-canto"
      const options: XCQueryOption = {
        query: "Sparrow",
        grp: "birds",
        cnt: "Brazil",
      };

      const url = constructQueryUrl(baseUrl, options);

      console.log(`Requested URL: ${url}`);
      expect(url).toBeTypeOf("string");
    });
  });
});
