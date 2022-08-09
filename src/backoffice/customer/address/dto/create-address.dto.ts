import { IsNotEmpty, IsString, Length, MinLength } from "class-validator"

export class CreateAddressDto {

    @IsNotEmpty()
    @IsString()
    @Length(8, 8, { message: 'CEP inválido' })
    public zipCode: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: 'Rua inválida' })
    public street: string

    @IsString()
    public number: string

    @IsString()
    public complement: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: 'Bairro inválido' })
    public neighborhood: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: 'Cidade inválida' })
    public city: string

    @IsNotEmpty()
    @IsString()
    @Length(2, 2, { message: 'Estado inválido' })
    public state: string

    @IsNotEmpty()
    @IsString()
    @Length(3, 3, { message: 'País inválido' })
    public country: string
}