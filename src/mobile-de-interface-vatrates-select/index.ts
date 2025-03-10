import { defineInterface } from "@directus/extensions-sdk";
import { DeepPartial, Field } from "@directus/types";
import InterfaceClass from "./interface.vue";
import { SITE_DEPENDENT_REFERENCE_DATA_TYPE_VATRATES } from "../constants";

export default defineInterface({
  id: "mobile-de-interface-vatrates-select",
  name: "Mobile.de Vat Rates",
  description: "Mobile DE Seller API Vat Rates",
  icon: "directions_car",
  component: InterfaceClass,
  types: ["string"],
  group: "selection",
  options: () => {
    const textOptions: {
      standard: DeepPartial<Field>[];
      advanced: DeepPartial<Field>[];
    } = {
      standard: SITE_DEPENDENT_REFERENCE_DATA_TYPE_VATRATES.path.map((item) => {
        return {
          field: item,
          name: item,
          type: "string",
          meta: {
            width: "half",
            interface: "input",
            options: {
              label: item,
              trim: true,
            },
          },
        };
      }),
      advanced: [],
    };

    return textOptions;
  },
});
