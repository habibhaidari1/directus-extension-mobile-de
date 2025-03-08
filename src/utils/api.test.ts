import { fetchRefData } from "./api";

describe("fetchRefData", () => {
  it("should fetch data successfully in german", async () => {
    Object.defineProperty(navigator, "language", {
      value: "de-DE",
    });
    // Call function and check result
    const result: RefData[] = await fetchRefData("classes");
    expect(result[0]).toEqual({
      name: "AgriculturalVehicle",
      description: "Agrarfahrzeug",
      url: "https://services.mobile.de/refdata/classes/AgriculturalVehicle",
    });
    expect(result[1]).toEqual({
      name: "Bus",
      description: "Bus",
      url: "https://services.mobile.de/refdata/classes/Bus",
    });
  });

  it("should fetch data successfully in english", async () => {
    Object.defineProperty(navigator, "language", {
      value: "en-GB",
    });
    const result: RefData[] = await fetchRefData("classes");
    expect(result[0]).toEqual({
      name: "AgriculturalVehicle",
      description: "Agricultural vehicle",
      url: "https://services.mobile.de/refdata/classes/AgriculturalVehicle",
    });
    expect(result[1]).toEqual({
      name: "Bus",
      description: "Coach",
      url: "https://services.mobile.de/refdata/classes/Bus",
    });
  });
});
