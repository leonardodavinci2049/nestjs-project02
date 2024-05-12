import { Module } from "@nestjs/common";
import { FileServiceV2 } from "./file.service";

@Module({
    providers: [FileServiceV2],
    exports: [FileServiceV2]
})
export class FileModule {}