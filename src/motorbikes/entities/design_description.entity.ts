import { Prop } from '@nestjs/mongoose';

export class DesignDescription {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    image: string;
}
