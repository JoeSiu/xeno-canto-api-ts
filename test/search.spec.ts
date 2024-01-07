import { beforeEach, describe, expect, test } from "vitest";
import { AdditionalQueryOption, XCQueryOption, search } from "../src";

describe("Search function", () => {
  beforeEach(async () => {
    // Add a 1 second delay before calling the API in each test
    return await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  test("Should have response status 200", async () => {
    const query = "Sparrow";
    const result = await search(query);

    expect(result.rawResponse.status).toBe(200);
  });

  describe("Simple search", () => {
    test("Normal query", async () => {
      const query = "Sparrow";
      const result = await search(query);

      console.log(`Testing URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.recordings.length).toBeGreaterThan(0);
    });

    test("Wrong query", async () => {
      const query = "qwertyuiopasdfghjklzxcvbnm";
      const result = await search(query);

      console.log(`Testing URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.recordings.length).toBe(0);
    });

    test("Query with whitespaces", async () => {
      const query = "   Sparrow   ";
      const result = await search(query);

      console.log(`Testing URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.numRecordings).toBeGreaterThan(0);
      expect(result.xcResponse.recordings.length).toBeGreaterThan(0);
    });

    test("Query with quotes", async () => {
      const query = '"Sparrow"';
      const result = await search(query);

      console.log(`Testing URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.numRecordings).toBeGreaterThan(0);
      expect(result.xcResponse.recordings.length).toBeGreaterThan(0);
    });

    test("Empty query should throw an error", async () => {
      await expect(search("")).rejects.toThrowError();
      await expect(search(" ")).rejects.toThrowError();
      await expect(search("    ")).rejects.toThrowError();
    });
  });

  describe("Advanced search", () => {
    test("Normal query", async () => {
      const query = "Sparrow";
      const options: XCQueryOption = {
        grp: "birds",
        cnt: "Brazil",
      };
      const result = await search(query, options);

      console.log(`Testing URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.numRecordings).toBeGreaterThan(0);
      expect(result.xcResponse.recordings.length).toBeGreaterThan(0);
    });

    test("Query with non-existent tag", async () => {
      const query = "Sparrow";
      const options: XCQueryOption = {
        "non-existent-tag": "no",
      };
      const result = await search(query, options);

      console.log(`Testing URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.numRecordings).toBeGreaterThan(0);
      expect(result.xcResponse.recordings.length).toBeGreaterThan(0);
    });

    test("Empty query with options", async () => {
      const query = "";
      const options: XCQueryOption = {
        cnt: "Brazil",
        q: "A",
      };
      const result = await search(query, options);

      console.log(`Testing URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.numRecordings).toBeGreaterThan(0);
      expect(result.xcResponse.recordings.length).toBeGreaterThan(0);
    });

    test("Query with spaced tag", async () => {
      const query = "Larus brachyrhynchus";
      const options: XCQueryOption = {
        cnt: "United States",
        method: "field recording",
      };
      const result = await search(query, options);

      console.log(`Testing URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.numRecordings).toBeGreaterThan(0);
      expect(result.xcResponse.recordings.length).toBeGreaterThan(0);
    });

    test("Query with non-bird group", async () => {
      const query = "Wood Cricket";
      const options: XCQueryOption = {
        grp: "grasshoppers",
      };
      const result = await search(query, options);

      console.log(`Testing URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.numRecordings).toBeGreaterThan(0);
      expect(result.xcResponse.recordings.length).toBeGreaterThan(0);
    });

    test("Query multiple pages", async () => {
      const query = "Sparrow";
      const options: XCQueryOption = {
        grp: "birds",
        cnt: "Brazil",
        q: "A",
      };

      const result = await search(query, options);

      console.log(`Testing URL: ${result.url}`);
      console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
      expect(result).toBeDefined();
      expect(result.rawResponse).toBeDefined();
      expect(result.xcResponse).toBeDefined();
      expect(result.xcResponse.numRecordings).toBeGreaterThan(0);
      expect(result.xcResponse.recordings.length).toBeGreaterThan(0);
    });

    test("Query with non-existent page should throw an error", async () => {
      const query = "Sparrow";
      const options: XCQueryOption = {
        page: 99999,
      };

      await expect(async () => {
        const result = await search(query, options);
        console.log(`Testing URL: ${result.url}`);
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
      test.todo("Unimplemented test");
    });
  });
});
