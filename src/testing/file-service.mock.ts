import { FileServiceV2 } from "../file/file.service";

export const fileServiceMock = {
  provide: FileServiceV2,
  useValue: {
    getDestinationPath: jest.fn(),
    upload: jest.fn().mockResolvedValue(''),
  },
};
