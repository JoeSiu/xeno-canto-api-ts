// Import the types and utility functions
import { XCQueryOption, XCRecordingKey, XCResponse, XCResponseKey } from "./types";
import { AdditionalConvertOption, constructQueryUrl, convertJsonToXCResponse, sanitizeQuery } from "./utils";

// Define the base URL for the API
export const BASE_URL = "https://www.xeno-canto.org/api/2/recordings";

/**
 * Represents additional options for the search function.
 */
export interface AdditionalSearchOption extends AdditionalConvertOption {
  /**
   * Override the default BASE_URL.
   */
  baseUrl?: string;
}

/**
 * Searches for a query via Fetch API and returns the response and XC response.
 *
 * @param {XCQueryOption} [options] - Options for the search query.
 * @param {AdditionalSearchOption} [additionalOptions] - Additional search options.
 * @return {Promise<{ url: URL, response: Response; xcResponse: XCResponse }>} A promise that resolves to an object containing the query URL, the response from fetch and a XCResponse object.
 */
async function search(
  options: XCQueryOption,
  additionalOptions?: AdditionalSearchOption,
): Promise<{ url: URL; rawResponse: Response; xcResponse: XCResponse }> {
  try {
    // Sanitize the query
    options.query = sanitizeQuery(options.query);

    // Create the query URL
    const url = constructQueryUrl(
      additionalOptions?.baseUrl ?? BASE_URL,
      options,
      { skipSanitizeQuery: additionalOptions?.skipSanitizeQuery || true } // As the query is already sanitized above, we don't need to sanitize it again (unless explicitly set in additionalOptions)
    );

    // Fetch the response and parse the JSON
    const rawResponse = await fetch(url);
    const json = await rawResponse.json();
    const xcResponse = convertJsonToXCResponse(json);

    // If the API returned an error, throw an error
    if (xcResponse.error) {
      Promise.reject(
        new Error(
          `Xeno-Canto API returned error '${xcResponse.error}': ${xcResponse.message}`,
        ),
      );
    }

    return Promise.resolve({ url: new URL(url), rawResponse, xcResponse });
  } catch (error: any) {
    // Error handling
    console.error(error);
    return Promise.reject(
      new Error(`Failed to perform search: ${error.message}`),
    );
  }
}

export * from "./types";
export * from "./utils";
export { search };
