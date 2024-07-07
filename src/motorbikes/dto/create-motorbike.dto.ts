import { Color } from '@/motorbikes/entities/color.entity';
import { DesignDescription } from '@/motorbikes/entities/design_description.entity';

export class CreateMotorbikeDto {
    name: string;
    description: string;
    introductionVideo: string;
    color: Color[];
    images: string[];
    thumbnailImage: string;
    designCatchPhrase: string;
    designBackgroundImage: string;
    designMotorbikeDisplayImage: string;
    designDescriptions: DesignDescription[];
    newFeatures: DesignDescription[];
    engineDescription: Record<string, string>;
    chassisDescription: Record<string, string>;
    sizeDescription: Record<string, string>;
    warrantyPolicy: Record<string, string>;
}
