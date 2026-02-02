import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEventDto {
    @ApiProperty({ example: 'Reunião de negócios'})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'Reunião com a equipe para discutir estratégias de mercado.'})
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({ example: '2023-12-01T10:00:00Z' })
    @Type(() => Date)
    @IsDate()
    startDateTime: Date;

    @ApiProperty({ example: '2023-12-01T11:00:00Z' })
    @Type(() => Date)
    @IsDate()
    endDateTime: Date;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsNotEmpty()
    userId: number;
}