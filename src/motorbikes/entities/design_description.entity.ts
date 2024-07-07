import { Column } from 'typeorm';

export class DesignDescription {
    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;
}
