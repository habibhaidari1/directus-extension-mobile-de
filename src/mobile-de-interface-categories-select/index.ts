import { defineInterface } from "@directus/extensions-sdk";
import { DeepPartial, Field } from "@directus/types";
import InterfaceClass from "./interface.vue";
import { SITE_DEPENDENT_REFERENCE_DATA_TYPE_CATEGORIES } from "../constants";

export default defineInterface({
  id: "mobile-de-interface-categories-select",
  name: "Mobile.de Categories",
  description: "Mobile DE Seller API Categories",
  icon: "directions_car",
  component: InterfaceClass,
  types: ["string"],
  group: "selection",
  options: () => {
    const textOptions: {
      standard: DeepPartial<Field>[];
      advanced: DeepPartial<Field>[];
    } = {
      standard: SITE_DEPENDENT_REFERENCE_DATA_TYPE_CATEGORIES.path.map((item) => {
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
