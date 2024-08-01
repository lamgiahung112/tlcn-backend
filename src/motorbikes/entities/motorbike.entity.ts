import { DesignDescription } from '@/motorbikes/entities/design_description.entity';
import { Variant } from '@/motorbikes/entities/variant.entity';
import { MediaResource } from '@/media-resource/entities/media-resource';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MotorbikeDocument = HydratedDocument<Motorbike>;

@Schema({
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
})
export class Motorbike {
    @Prop()
    name: string;

    @Prop()
    slug: string;

    @Prop()
    normalizedSlug: string;

    @Prop()
    description: string;

    @Prop()
    introductionVideo: string;

    @Prop()
    recommendedPrice: number;

    @Prop()
    category: string;

    @Prop({ type: [Variant] })
    variant: Variant[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'MediaResource' })
    thumbnailImage: MediaResource;

    @Prop()
    designCatchPhrase: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'MediaResource' })
    designBackgroundImage: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'MediaResource' })
    designMotorbikeDisplayImage: string;

    @Prop({ type: [DesignDescription] })
    designDescriptions: DesignDescription[];

    @Prop({ type: Map, of: String })
    engineDescription: Record<string, string>;

    @Prop({ type: Map, of: String })
    chassisDescription: Record<string, string>;

    @Prop({ type: Map, of: String })
    sizeDescription: Record<string, string>;

    @Prop({ type: Map, of: String })
    warrantyPolicy: Record<string, string>;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MediaResource' }]
    })
    galleryImages: MediaResource[];
}

export const MotorbikeSchema = SchemaFactory.createForClass(Motorbike);
