import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsObject,
    IsString,
    ValidateNested
} from 'class-validator';


class CartItem {
    @IsNumber()
    genericMotorbikeId: number;

    @IsNumber()
    quantity: number;
}

class CustomerData {
    @IsString()
    customerName: string;
    @IsString()
    customerPhone: string;
    @IsString()
    customerAddress: string;
    @IsString()
    customerEmail: string;
}

export class CreateOrderDto {
    @IsArray()
    @ValidateNested()
    cart: CartItem[];

    @IsObject()
    @ValidateNested()
    customer: CustomerData;

    @IsBoolean()
    onlyPayDeposit: boolean

    @IsString()
    paymentMethodId: string
}
