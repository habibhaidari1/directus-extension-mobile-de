type RefData = {
  name: string;
  description?: string;
  url: string;
};


type SiteDependentReferenceDataTypesEndpoint = {
  endpoint: string;
  path: string[];
}

interface VehicleTaxonomyValue {
  class: string | null;
  make: string | null;
  model: string | null;
}