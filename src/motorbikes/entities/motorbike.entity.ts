import {
    Column,
    Entity,
    JoinTable, ManyToMany,
    ManyToOne,
    ObjectIdColumn,
    OneToMany,
    OneToOne
} from 'typeorm';
import { ObjectId } from 'mongodb';
import { DesignDescription } from '@/motorbikes/entities/design_description.entity';
import { Variant } from '@/motorbikes/entities/variant.entity';
import { MediaResource } from '@/media-resource/entities/media-resource';

@Entity('motorbikes')
export class Motorbike {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column()
    normalizedSlug: string;

    @Column()
    description: string;

    @Column()
    introductionVideo: string;

    @Column()
    recommendedPrice: number;

    @Column()
    category: string;

    @Column(() => Variant)
    variant: Variant[];

    @ManyToOne(() => MediaResource, (mr) => mr.thumbnail, {
        eager: true
    })
    thumbnailImage: MediaResource;

    @Column()
    designCatchPhrase: string;

    @ManyToOne(() => MediaResource, (mr) => mr.thumbnail, {
        eager: true
    })
    designBackgroundImage: string;

    @ManyToOne(() => MediaResource, (mr) => mr.designDisplays, {
        eager: true
    })
    designMotorbikeDisplayImage: string;

    @Column(() => DesignDescription)
    designDescriptions: DesignDescription[];

    @Column()
    engineDescription: Record<string, string>;

    @Column()
    chassisDescription: Record<string, string>;

    @Column()
    sizeDescription: Record<string, string>;

    @Column()
    warrantyPolicy: Record<string, string>;

    @ManyToMany(() => MediaResource)
    galleryImages: MediaResource[];

    @Column()
    createdAt: Date;
}
