import { Color } from '@/motorbikes/entities/color.entity';
import { Prop } from '@nestjs/mongoose';
import { MediaResource } from '@/media-resource/entities/media-resource';
import mongoose from 'mongoose';

export class Variant {
    @Prop()
    color: Color;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MediaResource' }]
    })
    images: MediaResource[];
}
