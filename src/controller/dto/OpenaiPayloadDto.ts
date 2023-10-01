import { IsString, IsNumber } from "class-validator";

export default class OpenaiPayloadDto {

    // ementa
    @IsString()
    syllabus: string;

    @IsString()
    content: string;

    @IsNumber()
    classesQuantity: number;
}   