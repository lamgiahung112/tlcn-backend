import { PartialType } from '@nestjs/mapped-types';
import { CreateMotorbikeDto } from './create-motorbike.dto';

export class UpdateMotorbikeDto extends PartialType(CreateMotorbikeDto) {}
