import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { AlertsService } from './alerts.service';

@Controller('alerts')
export class AlertsController {
  constructor(
    private readonly alertsService: AlertsService,
  ) {}

  @Get()
  findAll() {
    return this.alertsService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.alertsService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.alertsService.update(id, body);
  }

  @Patch(':id/toggle')
  toggle(@Param('id') id: string) {
    return this.alertsService.toggle(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.alertsService.delete(id);
  }
}