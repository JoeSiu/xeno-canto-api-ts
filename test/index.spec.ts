import { beforeEach, describe, expect, test } from "vitest";
import { XCQueryOption, constructQueryUrl, search, BASE_URL } from "../src";
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.XC_API_KEY || "demo"; // Default to "demo" if not provided

describe("Search function", () => {
  beforeEach(async () => {
    // Add a 1 second delay before calling the API in each test
    return await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  describe("URL Construction", () => {
    test("Structured query tags", () => {
      const options: XCQueryOption = {
        cnt: "Brazil",
        grp: "birds",
        key: apiKey
      };
      const url = constructQueryUrl(BASE_URL, options);
      const urlObj = new URL(url.toString());
      const queryParam = urlObj.searchParams.get("query");
      expect(queryParam).toContain('cnt:"Brazil"');
      expect(queryParam).toContain('grp:"birds"');
      expect(urlObj.searchParams.get("key")).toBe(apiKey);
    });

    test("Pagination params", () => {
      const options: XCQueryOption = {
        cnt: "Brazil",
        page: 2,
        per_page: 50,
        key: apiKey
      };
      const urlObj = new URL(constructQueryUrl(BASE_URL, options).toString());
      expect(urlObj.searchParams.get("page")).toBe("2");
      expect(urlObj.searchParams.get("per_page")).toBe("50");
      expect(urlObj.searchParams.get("key")).toBe(apiKey);
    });

    test("Any extra search options", () => {
      const options: XCQueryOption = {
        en: "white",
        custom_tag: "custom_value",
        key: apiKey
      };
      const urlObj = new URL(constructQueryUrl(BASE_URL, options).toString());
      const queryParam = urlObj.searchParams.get("query");
      expect(queryParam).toContain('en:"white"');
      expect(queryParam).toContain('custom_tag:"custom_value"');
      expect(urlObj.searchParams.get("key")).toBe(apiKey);
    });
  });

  // Integration tests
  describe("Integration Tests", () => {
    test("Should have response status 200", async () => {
      const options: XCQueryOption = {
        en: "Sparrow",
        key: apiKey
      }
      const result = await search(options);

      expect(result.rawResponse.status).toBe(200);
    });

    describe("Simple search", () => {
      test("Normal query using tags", async () => {
        const options: XCQueryOption = {
          en: "Sparrow",
          key: apiKey
        }
        const result = await search(options);

        console.log(`Requested URL: ${result.url}`);
        console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
        expect(result).toBeDefined();
        expect(result.rawResponse).toBeDefined();
        expect(result.xcResponse).toBeDefined();
        expect(result.xcResponse.recordings.length).toBeGreaterThan(0);
      });

      test("Query with structured tags (cnt: Brazil)", async () => {
        const options: XCQueryOption = {
          en: "Sparrow",
          cnt: "Brazil",
          key: apiKey
        };
        const result = await search(options);
        console.log(`Requested URL: ${result.url}`);
        expect(result.xcResponse.numRecordings).toBeGreaterThan(0);
        if (result.xcResponse.recordings.length > 0) {
          expect(result.xcResponse.recordings[0].cnt).toBeDefined();
        }
      });

      test("Wrong query", async () => {
        const options: XCQueryOption = {
          en: "qwertyuiopasdfghjklzxcvbnm",
          key: apiKey
        }
        const result = await search(options);

        console.log(`Requested URL: ${result.url}`);
        console.log(`numRecordings: ${result.xcResponse.numRecordings}`);
        expect(result.xcResponse.recordings.length).toBe(0);
      });
    });

    describe("Advanced search features", () => {
      test("Per page option (50)", async () => {
        const options: XCQueryOption = {
          en: "Sparrow",
          per_page: 50,
          key: apiKey
        };
        const result = await search(options);
        console.log(`Requested URL: ${result.url}`);
        console.log(`Recordings returned: ${result.xcResponse.recordings.length}`);
        expect(result.xcResponse.recordings.length).toBe(50);
      });
    });

    describe("Error Handling", () => {
      test("Empty query should throw an error internally", async () => {
        await expect(search({ key: apiKey })).rejects.toThrowError();
      });
    });
  });
});
