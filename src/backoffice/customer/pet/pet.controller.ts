/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Result } from 'src/backoffice/result.model';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './pet.model';
import { PetService } from './pet.service';

@Controller('v1/pets')
export class PetController { 

    constructor(private readonly petService: PetService) {}

    @Post(':document')
    async createPet(@Param('document') document, @Body() createPetDto: CreatePetDto) {

        const PET = new Pet(
            createPetDto.name,
            createPetDto.gender,
            createPetDto.kind,
            createPetDto.breed
        )

        try {
            await this.petService.create(document, PET)

            return new Result('Pet criado com sucesso!', true, PET, null)

        } catch (error) {
            throw new HttpException(
                new Result(
                    'Não foi possível criar o seu pet',
                    false,
                    null,
                    error
                ),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Put(':document/:id')
    async updatePet(@Param('document') document, @Param('id') id, @Body() updatePetDto: UpdatePetDto) {

        const PET = new Pet(
            updatePetDto.name,
            updatePetDto.gender,
            updatePetDto.kind,
            updatePetDto.breed
        )

        try {
            await this.petService.update(document, id, PET)

            return new Result('Pet atualizado com sucesso!', true, PET, null)

        } catch (error) {
            throw new HttpException(
                new Result(
                    'Não foi possível atualizar o seu pet',
                    false,
                    null,
                    error
                ),
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
