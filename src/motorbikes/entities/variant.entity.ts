import { Column } from 'typeorm';
import { Color } from '@/motorbikes/entities/color.entity';

export class Variant {
    @Column()
    color: Color;

    @Column()
    images: string;
}
