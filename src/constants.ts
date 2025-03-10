export const BASE_URL = "https://services.mobile.de";

export const REFERENCE_DATA_TYPE_CLASSES = "classes";

export const REFERENCE_DATA_TYPE_MAKES = "makes";

export const REFERENCE_DATA_TYPE_MODELS = "models";

export const REFERENCE_DATA_TYPE_SITES = "sites";


export const SITE_DEPENDENT_REFERENCE_DATA_TYPE_CATEGORIES: SiteDependentReferenceDataTypesEndpoint =
  {
    endpoint: "categories",
    path: ["classes"],
  };

export const SITE_DEPENDENT_REFERENCE_DATA_TYPE_VATRATES: SiteDependentReferenceDataTypesEndpoint =
  {
    endpoint: "vatrates",
    path: ["sites"],
  };

export const SITE_DEPENDENT_REFERENCE_DATA_TYPE_USEDCARSEALS: SiteDependentReferenceDataTypesEndpoint =
  {
    endpoint: "usedcarseals",
    path: ["sites", "classes"],
  };

export const SITE_INDEPENDENT_REFERENCE_DATA_TYPES = [
  "airbags",
  "batterymanufacturers",
  "batteries",
  "batterypositions",
  "bendinglightstypes",
  "bikegeartypes",
  "bikesuitablefor",
  "breakdownservices",
  "climatisations",
  "colors",
  "conditions",
  "countryversion",
  "daytimerunninglamps",
  "doorcounts",
  "drivingcabs",
  "drivingmodes",
  "drivetypes",
  "emissionclasses",
  "emissionstickers",
  "framematerials",
  "frameshapes",
  "fuelconsumptionunits",
  "fuels",
  "gearboxes",
  "headlighttypes",
  "heatingtypes",
  "heighttypes",
  "hydraulicinstallations",
  "interiorcolors",
  "interiortypes",
  "lengthtypes",
  "motorpositions",
  "nominalinterestratetypes",
  "parkingassistants",
  "paybackperiods",
  "petroltypes",
  "plugtypes",
  "pricerating",
  "pricetypes",
  "radiotypes",
  "slidingdoortypes",
  "speedcontrols",
  "trailercouplingtypes",
  "usagetypes",
  "wheelbases",
  "wheelformulas",
];
