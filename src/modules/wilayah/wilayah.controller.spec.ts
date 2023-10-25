import { Test, TestingModule } from '@nestjs/testing';
import { WilayahController } from './wilayah.controller';
import { WilayahService } from './wilayah.service';

describe('WilayahController', () => {
  let controller: WilayahController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WilayahController],
      providers: [WilayahService],
    }).compile();

    controller = module.get<WilayahController>(WilayahController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all province', async () => {
    const province = await controller.findProvince();
    expect(province).toBeDefined();
  });
});
