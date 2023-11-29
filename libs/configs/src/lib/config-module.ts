import {ConfigModuleOptions} from "@nestjs/config";
import path from "path";

type Config = {
	pathsEnv?: string[];
};

export const getConfigModule = ({
	pathsEnv = [],
}: Config): ConfigModuleOptions => ({
	envFilePath: [path.resolve("libs/configs/src/.base.env"), ...pathsEnv],
	isGlobal: true,
});
