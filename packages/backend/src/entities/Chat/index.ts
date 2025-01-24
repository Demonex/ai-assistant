import {
	DateType,
	Entity,
	OneToOne,
	PrimaryKey,
	Property,
} from "@mikro-orm/core";
import { CollectionEntity } from "@repo/backend/entities/Collection/index.js";
import { UserEntity } from "@repo/backend/entities/User/index.js";

@Entity({ tableName: "chat_message" })
export class ChatMessageEntity {
	@PrimaryKey()
	id: number;

	@Property({
		type: "jsonb",
	})
	message: {
		[k: string]: unknown;
	};

	@Property({
		type: "jsonb",
		nullable: true,
	})
	response: {
		[k: string]: unknown;
	};

	@Property()
	created_at: DateType;

	@OneToOne({
		orphanRemoval: true,
	})
	user: UserEntity;

	@OneToOne({
		orphanRemoval: true,
	})
	collection: CollectionEntity;
}
