import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class CreateCustomerDto {
    
    @IsNotEmpty()
    @IsString()
    @MinLength(5, {message: 'Nome inválido'})
    name: string

    @IsNotEmpty()
    @IsString()
    @Length(11,11, {message: 'CPF inválido'})
    document: string

    @IsNotEmpty()
    @IsString()
    @IsEmail({}, {message: 'E-mail inválido'})
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6, {message: 'Senha inválida'})
    password: string
}