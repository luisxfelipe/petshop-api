import { Equals, IsInt, IsNumber, IsPositive, IsString, Max, ValidateIf } from "class-validator";

export class QueryDto {

    public query: any;

    @IsString()
    public fields: string;

    @IsString()
    public sort: string;

    @IsInt({message: 'Skip deve ser um número inteiro'})
    public skip: number = 0;

    @IsInt({message: 'Take deve ser um número inteiro'})
    @Max(1000, {message: 'Sua query não pode retornar mais que 1000 registros'})
    public take: number;
    
    /*
    @IsNotEmpty()
    
    @MinLength(5, {message: 'Nome inválido'})
    @Length(11,11, {message: 'CPF inválido'})*/
}