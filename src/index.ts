// Import the types and utility functions
import { AdditionalWrapperOption, XCQueryOption, XCResponse } from "./types";
import { XCResponseFromJson, constructQueryUrl } from "./utils/utils";

// Define the base URL for the API
export const BASE_URL = "https://www.xeno-canto.org/api/2/recordings?query=";

/**
 * Searches for a query and returns the response and XC response.
 *
 * @param {string} query - The query to search for.
 * @param {XCQueryOption} [options] - The options for the search query.
 * @param {number} [page] - The page parameter is optional and is only needed if the results from a given search don't fit in a single page. If specified, page must be an integer between 1 and XCResponse.numPages.
 * @param {AdditionalWrapperOption} [additionalOptions] - Additional options for this wrapper.
 * @return {Promise<{ response: Response; xcResponse: XCResponse }>} - A promise that resolves to an object containing the response from fetch and a XCResponse object.
 */
async function search(
  query: string,
  options?: XCQueryOption,
  page?: number,
  additionalOptions?: AdditionalWrapperOption,
): Promise<{ url: string; rawResponse: Response; xcResponse: XCResponse }> {
  // If query is empty and options is not provided, throw an error instantly instead of trying to fetch
  if (!query.trim() && !options) {
    return Promise.reject(
      new Error(
        "Please ensure that the 'query' parameter is not empty or that the 'options' parameter is provided",
      ),
    );
  }

  // Create the query URL
  const url = constructQueryUrl(
    additionalOptions?.baseUrl ?? BASE_URL,
    query,
    options,
    page,
  );

  // Fetch the response and parse the JSON
  try {
    const rawResponse = await fetch(url);
    const json = await rawResponse.json();
    const xcResponse = XCResponseFromJson(json);

    // If the API returned an error, throw an error
    if (xcResponse.error) {
      Promise.reject(
        new Error(
          `API returned error '${xcResponse.error}': ${xcResponse.message}`,
        ),
      );
    }

    return Promise.resolve({ url, rawResponse, xcResponse });
  } catch (error: any) {
    // Error handling
    console.error(error);
    return Promise.reject(
      new Error(`Failed to perform search: ${error.message}`),
    );
  }
}

export { search };
export * from "./types";
export * from "./utils";
