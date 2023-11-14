import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  City,
  Districts,
  SubDistricts,
  PostalCode,
  Province,
} from '@prisma/client';

@Injectable()
export class WilayahService {
  constructor(private prisma: PrismaService) {}

  async findProvince(name?: string): Promise<Province[]> {
    // return all province, if name is defined filter by name
    const province = await this.prisma.province.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
    return province;
  }

  async findCity(
    id?: string,
    name?: string,
    provinceId?: string,
  ): Promise<City[]> {
    const whereFilters = {
      id: undefined,
      name: undefined,
      provinceId: undefined,
    };
    if (id) {
      whereFilters['id'] = {
        equals: +id,
      };
    }
    if (name) {
      whereFilters['name'] = {
        contains: name,
        mode: 'insensitive',
      };
    }
    if (provinceId) {
      whereFilters['provinceId'] = {
        equals: +provinceId,
      };
    }
    const cities = await this.prisma.city.findMany({
      where: whereFilters,
      include: {
        province: true,
        districts: true,
      },
    });
    return cities;
  }

  async findDistricts(
    id?: string,
    name?: string,
    cityId?: string,
  ): Promise<Districts[]> {
    const whereFilters = { id: undefined, name: undefined, cityId: undefined };
    if (id) {
      whereFilters['id'] = {
        equals: +id,
      };
    }
    if (name) {
      whereFilters['name'] = {
        contains: name,
        mode: 'insensitive',
      };
    }
    if (cityId) {
      whereFilters['cityId'] = {
        equals: +cityId,
      };
    }
    const districts = await this.prisma.districts.findMany({
      where: whereFilters,
      include: {
        city: true,
        subDistricts: true,
      },
    });
    if (!districts) {
      throw new Error('Districts not found');
    }
    return districts;
  }

  async findSubDistricts(
    id?: string,
    name?: string,
    districtId?: string,
  ): Promise<SubDistricts[]> {
    const whereFilters = {
      id: undefined,
      name: undefined,
      districtId: undefined,
    };
    if (id) {
      whereFilters['id'] = {
        equals: +id,
      };
    }
    if (name) {
      whereFilters['name'] = {
        contains: name,
        mode: 'insensitive',
      };
    }
    if (districtId) {
      whereFilters['districtId'] = {
        equals: +districtId,
      };
    }
    const subDistricts = await this.prisma.subDistricts.findMany({
      where: whereFilters,
      include: {
        district: true,
        postalCodes: true,
      },
    });
    return subDistricts;
  }

  async findPostalCodes(
    code?: string,
    subDistrictId?: string,
  ): Promise<PostalCode[]> {
    const whereFilters = { code: undefined, subDistrictId: undefined };
    if (code) {
      whereFilters['postalCode'] = {
        equals: +code,
      };
    }
    if (subDistrictId) {
      whereFilters['subDistrictId'] = {
        equals: +subDistrictId,
      };
    }
    const postalCode = await this.prisma.postalCode.findMany({
      where: whereFilters,
      include: {
        subDistrict: {
          include: {
            district: {
              include: {
                city: {
                  include: {
                    province: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return postalCode;
  }
}
