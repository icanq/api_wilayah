import { Test, TestingModule } from '@nestjs/testing';
import { WilayahService } from './wilayah.service';

describe('WilayahService', () => {
  let service: WilayahService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WilayahService],
    }).compile();

    service = module.get<WilayahService>(WilayahService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all province', async () => {
    const province = await service.findProvince();
    expect(province).toBeDefined();
  });
});
