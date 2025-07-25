import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @ApiProperty({example : 'abc@gmail.com'})
    @IsEmail()
    @IsNotEmpty()
    email : string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password : string
}