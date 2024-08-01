import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MediaResourceDocument = HydratedDocument<MediaResource>;

@Schema()
export class MediaResource {
    @Prop()
    name: string;

    @Prop()
    type: 'IMAGE' | 'VIDEO';

    @Prop({
        required: true,
        unique: true
    })
    path: string;
}

export const MediaResourceSchema = SchemaFactory.createForClass(MediaResource);
