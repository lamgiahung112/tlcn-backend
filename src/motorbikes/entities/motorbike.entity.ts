import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { DesignDescription } from '@/motorbikes/entities/design_description.entity';
import { Variant } from '@/motorbikes/entities/variant.entity';

@Entity('motorbikes')
export class Motorbike {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    introductionVideo: string;

    @Column((type) => Variant)
    variant: Variant[];

    @Column()
    thumbnailImage: string;

    @Column()
    designCatchPhrase: string;

    @Column()
    designBackgroundImage: string;

    @Column()
    designMotorbikeDisplayImage: string;

    @Column((type) => DesignDescription)
    designDescriptions: DesignDescription[];

    @Column((type) => DesignDescription)
    newFeatures: DesignDescription[];

    @Column()
    engineDescription: Record<string, string>;

    @Column()
    chassisDescription: Record<string, string>;

    @Column()
    sizeDescription: Record<string, string>;

    @Column()
    warrantyPolicy: Record<string, string>;
}
