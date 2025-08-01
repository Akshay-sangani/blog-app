import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class EmailDto{
    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email : string

    @IsOptional()
    @IsString()
    password? : string

    @IsOptional()
    @IsString()
    token? : string
}