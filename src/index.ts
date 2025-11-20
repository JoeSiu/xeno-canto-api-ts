// Import the types and utility functions
import { XCQueryOption, XCResponse } from "./types";
import { constructQueryUrl, convertJsonToXCResponse } from "./utils";

// Define the base URL for the API
export const BASE_URL = "https://xeno-canto.org/api/3/recordings";

/**
 * Represents additional options for the search function.
 */
export interface AdditionalSearchOption {
  /**
   * Override the default BASE_URL.
   */
  baseUrl?: string;
  /**
   * Whether to mute the error if the API returns an error.
   */
  muteApiError?: boolean;
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
    // Create the query URL
    const url = constructQueryUrl(
      additionalOptions?.baseUrl ?? BASE_URL,
      options
    );

    // Fetch the response and parse the JSON
    const rawResponse = await fetch(url);
    const json = await rawResponse.json();
    const xcResponse = convertJsonToXCResponse(json);

    // If the API returned an error, throw an error
    if (xcResponse.error && !additionalOptions?.muteApiError) {
      throw new Error(
        `Xeno-Canto API returned error '${xcResponse.error}': ${xcResponse.message}`,
      );
    }

    return Promise.resolve({ url: new URL(url), rawResponse, xcResponse });
  } catch (error: any) {
    // Error handling
    return Promise.reject(
      new Error(`Failed to perform search: ${error.message}`),
    );
  }
}

export * from "./types";
export * from "./utils";
export { search };
