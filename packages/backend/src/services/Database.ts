import { MikroORM } from "@mikro-orm/core";
import { Injectable, type OnModuleInit } from "@nestjs/common";

@Injectable()
export class DatabaseService implements OnModuleInit {
	constructor(private readonly orm: MikroORM) {}

	async onModuleInit() {
		if (await this.orm.getSchemaGenerator().ensureDatabase()) {
			// await this.orm.getSchemaGenerator().updateSchema({ safe: true });
		} else {
			await this.orm.getSchemaGenerator().createSchema();
		}
	}
}
