import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientEntity } from '../entities/client.entity';
import { CreateClientRequestDto } from '../dtos/request/create-client.dto';
import { DeleteClientRequestDto } from '../dtos/request/delete-client.dto';
import { ListClientDto } from '../dtos/response/list-client.dto';
import { ClientService } from '../services/client.service';
import { UpdateClientRequestDto } from '../dtos/request/update-client.dto';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas os clientes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de cliente',
    type: ListClientDto,
    isArray: true,
  })
  findAll(): Promise<ClientEntity[]> {
    return this.clientService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar um cliente' })
  @ApiResponse({
    status: 200,
    description: 'Cadastro cliente',
    type: ListClientDto,
  })
  async create(@Body() payload: CreateClientRequestDto) {
    try {
      return await this.clientService.create(payload);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(`${error.message}`);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma categoria' })
  delete(@Param() payload: DeleteClientRequestDto) {
    return this.clientService.delete(payload.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma categoria' })
  @ApiResponse({
    status: 200,
    description: 'Categoria atualizada',
    type: CreateClientRequestDto,
  })
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateClientRequestDto
  ) {
    try {
      return await this.clientService.update(id, payload);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(`${error.message}`);
    }
  }
}
