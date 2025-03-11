// @ts-ignore
import type { EndpointConfig, Accountability } from "@directus/types";
import axios from "axios";
import { stringify } from "qs";
import { BASE_URL } from "../constants";

const endpointConfig: EndpointConfig = {
  id: "mobile-de",
  handler: (router, { database }) => {

    // Mobile.de API proxy endpoint
    router.get("/refdata/*", async (req, res) => {
      const userId = (req.accountability as Accountability)?.user ?? null;
      if (userId == null) {
        res.status(401).send("Unauthenticated");
        return;
      }

      try {
        const user = await database
          .select("language")
          .from("directus_users")
          .where({ id: userId })
          .first();

        const userLang =
          user && user.language
            ? user.language.split(",")[0].split("-")[0]
            : "de";

        console.log(user.language);

        // Get the full path from the wildcard route
        const fullPath = req.params[0];

        // Make request to Mobile.de API
        const response = await axios({
          method: "GET",
          url: `${BASE_URL}/refdata/${fullPath}`,
          headers: {
            Accept: "application/vnd.de.mobile.api+json",
            "Accept-Language": userLang,
          },
          params: req.query,
          paramsSerializer: (params) =>
            stringify(params, { arrayFormat: "brackets" }),
        });

        // Return the values array like the original implementation
        return res.status(200).json(response.data.values);
      } catch (error) {
        console.error("Mobile.de API error:", error);

        if (axios.isAxiosError(error) && error.response) {
          return res.status(error.response.status).send(error.response.data);
        }

        return res.status(500).send({
          error: `Failed to fetch data: ${
            error instanceof Error ? error.message : String(error)
          }`,
        });
      }
    });
  },
};

export default endpointConfig;
