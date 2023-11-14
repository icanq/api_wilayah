# API Wilayah Documentation

## Overview
This repository contains the API for managing and retrieving data related to administrative regions in a given country. The API allows clients to fetch information about provinces, cities, districts, subdistricts, and postal codes.

## Installation


### Clone the repository

```bash
git clone [repository-url]
```

### Navigate to the repository directory

```bash
cd [repository-name]

# Install dependencies
npm install
```

### Run the application

```bash
npm start:dev

# or

npm start
```

# Usage

The API exposes several endpoints for retrieving regional data:

## Provinces

GET /wilayah/provinces: Retrieves a list of provinces. Can be filtered by the 'name' query parameter.

## Cities

GET /wilayah/cities: Retrieves a list of cities. Can be filtered by 'name', 'provinceId', or 'id' query parameters.

## Districts

GET /wilayah/districts: Retrieves a list of districts. Can be filtered by 'name', 'cityId', or 'id' query parameters.

## Subdistricts

GET /wilayah/subdistricts: Retrieves a list of subdistricts. Can be filtered by 'name', 'districtId', or 'id' query parameters.

## Postal Codes

GET /wilayah/postal-codes: Retrieves a list of postal codes. Can be filtered by 'code' or 'subDistrictId' query parameters.

# Examples

```javascript
// Fetch provinces
fetch('/wilayah/provinces')
  .then(response => response.json())
  .then(data => console.log(data));

// Fetch cities by province ID
fetch('/wilayah/cities?provinceId=12345')
  .then(response => response.json())
  .then(data => console.log(data));
```

# Error Handling
The API uses conventional HTTP response codes to indicate the success or failure of an API request.

# Contributing
Just submitting pull requests to us.

# Contact
For any queries, you can reach out to my [linkedin](https://linkedin.com/in/natawijayaichsan).
