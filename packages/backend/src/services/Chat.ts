import { EntityManager, MikroORM, PopulateHint } from "@mikro-orm/core";
import { InjectRedis } from "@nestjs-modules/ioredis";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ChatMessageEntity } from "@repo/backend/entities/Chat/index.js";
import type { Redis } from "ioredis";
import type { ChatMessageDto } from "../dto/Chat.js";
import { CollectionEntity } from "../entities/Collection/index.js";

@Injectable()
export class ChatService {
	constructor(
		@InjectRedis() private readonly redisClient: Redis,
		private readonly orm: MikroORM,
		private readonly em: EntityManager,
	) {}

	async chats(userId: ChatMessageEntity["user"]["id"]) {
		const chats = await this.em.find<CollectionEntity>(CollectionEntity, {});

		return chats;
	}

	async chat(
		userId: ChatMessageEntity["user"]["id"],
		chatId: ChatMessageEntity["id"],
	) {
		const messages = await this.em.find<ChatMessageEntity>(ChatMessageEntity, {
			user: userId,
			collection: chatId,
		});
		return messages;
	}

	async messageCreate(
		userId: ChatMessageEntity["user"]["id"],
		chatId: CollectionEntity["id"],
		{ raw }: ChatMessageDto,
	) {
		try {
			const chatMessage = this.em.create<ChatMessageEntity>(ChatMessageEntity, {
				user: userId,
				collection: chatId,
				message: {
					raw,
				},
			});
			await this.em.persistAndFlush(chatMessage);

			return chatMessage;
		} catch (error) {
			console.error("Error creating chatMessage:", error);

			throw new HttpException(
				"Internal Server Error",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async uploadMedia(id, collectionId, data) {
		const collection = await this.em.findOneOrFail<CollectionEntity>(
			CollectionEntity,
			{
				id: collectionId,
			},
			{
				populate: ["providers"],
				populateWhere: PopulateHint.INFER,
			},
		);

		console.log(id, collection, data);
	}
}
