import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail-service.service';

@Module({
  providers : [MailService],
  exports : [MailService]
})
export class MailModuleModule {}
