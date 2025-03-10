import { defineInterface } from "@directus/extensions-sdk";
import { DeepPartial, Field } from "@directus/types";
import InterfaceClass from "./interface.vue";
import {
  SITE_DEPENDENT_REFERENCE_DATA_TYPE_USEDCARSEALS,
} from "../constants";

export default defineInterface({
  id: "mobile-de-interface-usedcarseals-select",
  name: "Mobile.de used car seals",
  description: "Mobile DE Seller API used car seals",
  icon: "directions_car",
  component: InterfaceClass,
  types: ["string"],
  group: "selection",
  options: () => {
    const textOptions: {
      standard: DeepPartial<Field>[];
      advanced: DeepPartial<Field>[];
    } = {
      standard: SITE_DEPENDENT_REFERENCE_DATA_TYPE_USEDCARSEALS.path.map(
        (item) => {
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
        }
      ),
      advanced: [],
    };

    return textOptions;
  },
});
