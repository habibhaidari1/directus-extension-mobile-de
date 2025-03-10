import { defineInterface } from "@directus/extensions-sdk";
import { DeepPartial, Field } from "@directus/types";
import InterfaceClass from "./interface.vue";

export default defineInterface({
  id: "mobile-de-interface-vehicle-taxonomy-select",
  name: "Mobile.de Vehicle Taxonomy",
  description: "Mobile.de Seller API Vehicle Taxonomy",
  icon: "directions_car",
  component: InterfaceClass,
  types: ["json"],
  group: "selection",
  options: () => {
    const textOptions: {
      standard: DeepPartial<Field>[];
      advanced: DeepPartial<Field>[];
    } = {
      standard: [],
      advanced: [],
    };

    return textOptions;
  },
});
