import { Controller, Get, Query } from '@nestjs/common';
import { WilayahService } from './wilayah.service';

@Controller('wilayah')
export class WilayahController {
  constructor(private readonly wilayahService: WilayahService) {}

  @Get('provinces')
  async findProvince(@Query('name') name?: string) {
    try {
      const province = await this.wilayahService.findProvince(name);
      return province;
    } catch (e) {
      return e;
    }
  }

  @Get('cities')
  async findCity(
    @Query('name') name?: string,
    @Query('provinceId') provinceId?: string,
  ) {
    if (!name && !provinceId) {
      return {
        message: 'name or provinceId must be present',
      };
    }
    try {
      const city = await this.wilayahService.findCity(name, provinceId);
      return city;
    } catch (e) {
      return e;
    }
  }

  @Get('districts')
  async findDistricts(
    @Query('name') name?: string,
    @Query('cityId') cityId?: string,
  ) {
    if (!name && !cityId) {
      return {
        message: 'name or cityId must be present',
      };
    }
    try {
      const districts = await this.wilayahService.findDistricts(name, cityId);
      return districts;
    } catch (e) {
      return e;
    }
  }

  @Get('subdistricts')
  async findSubDistricts(
    @Query('name') name?: string,
    @Query('districtId') districtId?: string,
  ) {
    if (!name && !districtId) {
      return {
        message: 'name or districtId must be present',
      };
    }
    try {
      const subdistricts = await this.wilayahService.findSubDistricts(
        name,
        districtId,
      );
      return subdistricts;
    } catch (e) {
      return e;
    }
  }

  @Get('postal-codes')
  async findPostalCodes(
    @Query('code') code?: string,
    @Query('subDistrictId') subDistrictId?: string,
  ) {
    if (!code && !subDistrictId) {
      return {
        message: 'name or subDistrictId must be present',
      };
    }
    try {
      const postalCodes = await this.wilayahService.findPostalCodes(
        code,
        subDistrictId,
      );
      return postalCodes;
    } catch (e) {
      return e;
    }
  }
}
