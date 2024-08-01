import { Prop } from '@nestjs/mongoose';

export class Color {
    @Prop()
    name: string;

    @Prop()
    hex: string;
}
