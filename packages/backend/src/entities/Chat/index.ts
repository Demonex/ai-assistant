import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
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

	@OneToOne({
		// joinColumn: 'collection_id',
		orphanRemoval: true,
	})
	user: UserEntity;

	@OneToOne({
		// joinColumn: 'collection_id',
		orphanRemoval: true,
	})
	collection: CollectionEntity;
}
