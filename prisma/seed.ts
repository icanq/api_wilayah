import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

const prisma = new PrismaClient();

function parseCSV(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const results = [];
    console.log(filePath, ' this is filePath');
    fs.createReadStream(filePath)
      .pipe(
        Papa.parse(Papa.NODE_STREAM_INPUT, {
          header: true,
          skipEmptyLines: true,
        }),
      )
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', reject);
  });
}

async function seed() {
  try {
    // Seeding Provinces
    const provinces = await parseCSV(
      path.resolve(__dirname, './seeders/provinces.csv'),
    );
    console.log(provinces, ' this is provinces');

    await prisma.$transaction(
      provinces.map((province) =>
        prisma.province.create({
          data: { id: Number(province.id), name: province.name },
        }),
      ),
    );
    console.log('Provinces seeded.');

    // Seeding Cities
    const cities = await parseCSV('./seeders/cities.csv');
    await prisma.$transaction(
      cities.map((city) =>
        prisma.city.create({
          data: {
            id: Number(city.id),
            name: city.name,
            provinceId: Number(city.province_id),
          },
        }),
      ),
    );
    console.log('Cities seeded.');

    // Seeding Districts
    const districts = await parseCSV('./seeders/districts.csv');
    await prisma.$transaction(
      districts.map((district) =>
        prisma.districts.create({
          data: {
            id: Number(district.id),
            name: district.name,
            cityId: Number(district.city_id),
          },
        }),
      ),
    );
    console.log('Districts seeded.');

    // Seeding SubDistricts
    const subdistricts = await parseCSV('./seeders/subdistricts.csv');
    await prisma.$transaction(
      subdistricts.map((subdistrict) =>
        prisma.subDistricts.create({
          data: {
            id: Number(subdistrict.id),
            name: subdistrict.name,
            districtId: Number(subdistrict.district_id),
          },
        }),
      ),
    );
    console.log('SubDistricts seeded.');

    // Seeding PostalCodes
    const postalcodes = await parseCSV('./seeders/postalcode.csv');
    await prisma.$transaction(
      postalcodes.map((postalcode) =>
        prisma.postalCode.create({
          data: {
            id: Number(postalcode.id),
            postalCode: Number(postalcode.postal_code),
            subDistrictId: Number(postalcode.subdistrict_id),
          },
        }),
      ),
    );
    console.log('PostalCodes seeded.');
  } catch (error) {
    console.error('Error seeding data: ', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
