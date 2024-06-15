import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const cors: CorsOptions = {
  origin: '*',
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
