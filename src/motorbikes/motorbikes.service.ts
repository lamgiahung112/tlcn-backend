import { Injectable } from '@nestjs/common';
import { Motorbike } from '@/motorbikes/entities/motorbike.entity';
import GetMotorbikeListDto from '@/motorbikes/dto/get-motorbike-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MotorbikesService {
    constructor(
        @InjectModel(Motorbike.name)
        private motorbikeModel: Model<Motorbike>
    ) {}

    find(params: GetMotorbikeListDto): Promise<Motorbike[]> {
        return this.motorbikeModel
            .find({
                $and: [
                    {
                        recommendedPrice: {
                            $and: [
                                {
                                    $gte: params.minPrice || 0,
                                    $lte: params.maxPrice || Infinity
                                }
                            ]
                        }
                    },
                    {
                        name: {
                            $regex: new RegExp(params.name, 'i')
                        }
                    },
                    {
                        category: {
                            $regex: new RegExp(params.category, 'i')
                        }
                    }
                ]
            })
            .elemMatch('variant.color', params.color)
            .skip(params.page * params.size)
            .limit(params.size)
            .sort(params.sort);
    }
}
