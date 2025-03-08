import { BASE_URL } from '../constants'

/**
 * Mobile.de API client
 */
export function fetchRefData(endpoint: string): Promise<RefData[]> {
  const browserLang =
    typeof navigator !== "undefined"
      ? navigator.language.split("-")[0] || "de"
      : "de";

  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/refdata/${endpoint}`, {
      headers: {
        Accept: "application/vnd.de.mobile.api+json",
        "Accept-Language": browserLang,
      },
    })
      .then((response) => {
        if (!response.ok) {
          reject(new Error(`Failed to fetch data, status: ${response.status}`));
        }
        return response.json();
      })
      .then((result) => resolve(result.values))
      .catch((error: unknown) => {
        reject(new Error(`Failed to fetch data: ${String(error)}`));
      });
  });
}
