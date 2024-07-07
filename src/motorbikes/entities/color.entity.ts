import { Column } from 'typeorm';

export class Color {
    @Column()
    name: string;

    @Column()
    hex: string;
}
