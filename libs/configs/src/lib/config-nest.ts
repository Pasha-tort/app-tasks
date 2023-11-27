import { ConfigModule } from "@nestjs/config";

type Config = {
  pathsEnv?: string[];
}

export const getConfigModule = ({
  pathsEnv = [],
}: Config) =>
  ConfigModule.forRoot({
    envFilePath: ["../.base.env", ...pathsEnv],
  });