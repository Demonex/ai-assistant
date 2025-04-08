import { Injectable } from "@nestjs/common";
import { ChatMessageEntity } from "../entities/Chat/index.js";

import { EntityManager } from "@mikro-orm/core";

import { CollectionEntity } from "../entities/Collection/index.js";

@Injectable()
export class CollectionService {
	constructor(private readonly em: EntityManager) {}

	async getCollections(userId: ChatMessageEntity["user"]["id"], currentTenant) {
		// const user = await this.em.findOneOrFail<UserEntity, HintType>(UserEntity, {
		// 	id: userId,
		// });

		// const groups = await this.em.find<GroupEntity, HintType>(
		// 	GroupEntity,
		// 	{
		// 		users: {
		// 			user: userId,
		// 		},
		// 	},
		// 	{
		// 		populate: ["users", "groupPermissions", "groupCollectionPermissions"],
		// 		populateWhere: "infer",
		// 	},
		// );

		// const hasCollectionPermission =
		// 	user?.superadmin ||
		// 	groups.some((group) => {
		// 		return group.groupPermissions
		// 			.map(
		// 				(entity) =>
		// 					entity.permission === GROUP_PERMISSION.admin ||
		// 					entity.permission === GROUP_PERMISSION.collection,
		// 			)
		// 			.some((el) => !!el);
		// 	});

		// if (hasCollectionPermission) {
		// 	const collections = await this.em.find<CollectionEntity>(
		// 		CollectionEntity,
		// 		{
		// 			tenant: currentTenant,
		// 		},
		// 		{
		// 			exclude: ["tenant", "providers", "groups"],
		// 		},
		// 	);

		// 	return collections;
		// }

		// const collectionKeys = groups.flatMap((group) => {
		// 	return group.groupCollectionPermissions.map((perm) => perm.collection.id);
		// });

		// const collections = await this.em.find<CollectionEntity>(
		// 	CollectionEntity,
		// 	{
		// 		id: {
		// 			$in: collectionKeys,
		// 		},
		// 		tenant: currentTenant,
		// 	},
		// 	{
		// 		exclude: ["tenant", "providers", "groups"],
		// 	},
		// );

		// return collections;
		const collections = await this.em.find<CollectionEntity>(CollectionEntity, {
			tenant: currentTenant,
		});

		return collections;
	}
}
