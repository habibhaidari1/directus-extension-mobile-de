# Mobile.de Reference Data Directus Extension

A Directus interface extension that integrates with the mobile.de Seller API to automatically fetch relevant selection options for vehicle-related fields.

## Description

This extension connects to the mobile.de API to provide structured reference data for various vehicle-related categories such as vehicle classes, airbags, battery types, colors, fuel types, and many more. It simplifies the process of creating consistent vehicle data entries in your Directus instance.

## Features

- Automatic fetching of reference data from mobile.de's API
- Language detection (automatically uses browser language, defaulting to German)
- User-friendly dropdown interface
- Support for 40+ vehicle-related data categories
- Loading state indicators

## Installation

```bash
npm install directus-extension-mobile-de
```

Or manually:

1. Download or clone this repository
2. Build the extension:
```bash
npm run build
```
3. Copy the dist folder to your Directus extensions folder
4. Restart your Directus instance

## Usage

1. Create a new field with type "string" in your Directus collection
2. Set the interface to "Mobile de Reference Data"
3. In the field configuration, select the desired reference data type from the dropdown (e.g., "classes", "colors", "fuels")
4. The field will automatically populate with options from mobile.de's API

## Configuration

The extension offers the following configuration options:

- **Reference Data Type**: Select from 40+ available reference data types including vehicle classes, colors, fuel types, etc.

## Requirements

- Directus version 10.10.0 or higher
- Internet access to the mobile.de API services

## Development

```bash
# Install dependencies
npm install

# Start development mode
npm run dev

# Build for production
npm run build

# Link to local Directus installation
npm run link
```

## License

MIT