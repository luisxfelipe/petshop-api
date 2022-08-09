import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreatePetDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(2, { message: 'Nome inválido' })
    public name: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: 'Gênero inválido' })
    public gender: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: 'Tipo inválido' })
    public kind: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: 'Raça inválida' })
    public breed: string
}