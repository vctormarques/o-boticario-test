import {
  BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
  } from '@nestjs/common';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddressEntity } from '../entities/address.entity';
import { CreateAddressRequestDto } from '../dtos/request/create-address.dto';
import { DeleteAddressRequestDto } from '../dtos/request/delete-address.dto';
import { ListAddressResponseDto } from '../dtos/response/list-address.dto';
import { CreateAddressResponseDto } from '../dtos/response/create-address.dto';
import { AddressService } from '../services/address.service';

  
  @ApiTags('Address')
  @Controller('Address')
  export class AddressController {
    constructor(private addressService: AddressService) {}
  
    @Get()
    @ApiOperation({ summary: 'Listar todas os endereços' })
    @ApiResponse({ status: 200, description: 'Lista de endereço', type: ListAddressResponseDto, isArray: true })
    findAll(): Promise<AddressEntity[]> {
      return this.addressService.findAll();
    }
  
    @Post()
    @ApiOperation({ summary: 'Cadastrar um endereço' })
    @ApiResponse({ status: 200, description: 'Cadastro efetuado', type: CreateAddressResponseDto})
    create(@Body() payload: CreateAddressRequestDto) {
      return this.addressService.create(payload);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Excluir um endereço' })
    async delete(@Param() payload: DeleteAddressRequestDto) {
      try {
        return await this.addressService.delete(payload.id);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new NotFoundException(error.message);
        }
        throw new BadRequestException(`${error.message}`);
      }
    }

  }
  