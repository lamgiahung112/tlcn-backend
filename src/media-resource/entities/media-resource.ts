import { Column, Entity, ObjectIdColumn, OneToMany, Unique } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Motorbike } from '@/motorbikes/entities/motorbike.entity';

@Entity('media-resource')
@Unique(['path'])
export class MediaResource {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    name: string;

    @Column()
    type: 'IMAGE' | 'VIDEO';

    @Column()
    path: string;

    @Column()
    created_at: Date;

    @OneToMany(() => Motorbike, (motorbike) => motorbike.thumbnailImage, {
        eager: false
    })
    thumbnail: Motorbike[];

    @OneToMany(
        () => Motorbike,
        (motorbike) => motorbike.designMotorbikeDisplayImage,
        {
            eager: false
        }
    )
    designDisplays: Motorbike[];
}
