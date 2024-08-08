import { Injectable } from '@nestjs/common';
import { Motorbike } from '@/motorbikes/entities/motorbike.entity';
import GetMotorbikeListDto from '@/motorbikes/dto/get-motorbike-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';

@Injectable()
export class MotorbikesService {
    constructor(
        @InjectModel(Motorbike.name)
        private motorbikeModel: Model<Motorbike>
    ) { }

    find(params: GetMotorbikeListDto): Promise<Motorbike[]> {
        const pipeline: PipelineStage[] = [
            {
                $match: {
                    $and: [
                        {
                            recommendedPrice: {
                                $gte: params.minPrice || 0
                            }
                        },
                        {
                            recommendedPrice: {
                                $lte: params.maxPrice || Infinity
                            }
                        }
                    ]
                }
            },
            {
                $match: {
                    name: {
                        $regex: new RegExp(params.name, 'i')
                    }
                }
            },
            {
                $match: {
                    category: {
                        $regex: new RegExp(params.category, 'i')
                    }
                }
            },
            {
                $match: {
                    variant: {
                        $elemMatch: {
                            color: {
                                $in: params.color
                            }
                        }
                    }
                }
            }
        ];
        return this.motorbikeModel
            .aggregate(pipeline)
            .skip(params.page * params.size)
            .limit(params.size)
            .sort(params.sort);
    }
}
