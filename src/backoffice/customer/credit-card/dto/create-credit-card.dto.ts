import { IsNotEmpty, IsString, Length, MinLength } from "class-validator"

export class CreateCreditCartdDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(5, {message: 'Nome no cartão inválido'})
    public holder: string
    
    @IsNotEmpty()
    @IsString()
    @Length(16,16, {message: 'Número do cartão inválido'})
    public number: string

    @IsNotEmpty()
    @IsString()
    @Length(4,4, {message: 'Data de expiração do cartão inválida'})
    public expiration: string
}