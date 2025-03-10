import { defineInterface } from "@directus/extensions-sdk";
import { DeepPartial, Field } from "@directus/types";
import InterfaceClass from "./interface.vue";
import { SITE_INDEPENDENT_REFERENCE_DATA_TYPES } from "../constants";

export default defineInterface({
  id: "mobile-de-interface-site-independent-refdata-select",
  name: "Mobile.de Site Independent Reference Data",
  description: "Mobile.de Seller API Site Independent Reference Data Types",
  icon: "directions_car",
  component: InterfaceClass,
  types: ["string"],
  group: "selection",
  options: () => {
    const textOptions: {
      standard: DeepPartial<Field>[];
      advanced: DeepPartial<Field>[];
    } = {
      standard: [
        {
          field: "reference_data_type",
          name: "Reference Data Type",
          type: "string",
          meta: {
            required: true,
            width: "full",
            interface: "select-dropdown",
            options: {
              choices: SITE_INDEPENDENT_REFERENCE_DATA_TYPES.map((type) => ({
                text: type,
                value: type,
              })),
            },
          },
        },
      ],
      advanced: [],
    };

    return textOptions;
  },
});
