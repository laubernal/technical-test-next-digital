import { Controller, Post, Body, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { DepositCommand } from 'src/Application/Deposit/DepositCommand';
import { NotValidPinError } from 'src/Domain/Error/NotValidPinError';
import { DepositRequest } from './DepositRequest';

@Controller()
export class DepositController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/api/deposit')
  public async post(
    @Body() body: DepositRequest,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const command = new DepositCommand(
        body.cardNumber,
        body.pin,
        body.amount,
      );

      await this.commandBus.execute(command);

      response.status(200).send({});
    } catch (error: unknown) {
      if (error instanceof NotValidPinError) {
        response.status(403).send({});
      }

      response.status(500).send({});
    }
  }
}
