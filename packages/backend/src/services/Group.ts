import { EntityManager } from "@mikro-orm/core";
import { UserEntity } from "@repo/backend/entities/User/index.js";
import { GROUP_PERMISSION } from "../entities/Group/group-group-permissions.js";
import { GroupEntity } from "../entities/Group/index.js";
import { Injectable } from "@nestjs/common";
import type { ChatMessageEntity } from "../entities/Chat/index.js";

@Injectable()
export class GroupService {
	constructor(private readonly em: EntityManager) {}

	async findGroups(
		userKey:
			| ChatMessageEntity["user"]["id"]
			| ChatMessageEntity["user"]["email"]
			| UserEntity,
		fields?: (keyof GroupEntity)[],
	) {
		const groups = await this.em.find<
			GroupEntity,
			keyof GroupEntity,
			keyof GroupEntity
		>(
			GroupEntity,
			{
				users: {
					user: (function () {
						if (userKey instanceof UserEntity) {
							return userKey;
						} else if (typeof userKey === "number") {
							return { id: userKey };
						} else {
							return { email: userKey };
						}
					})(),
				},
			},
			{
				populate: ["users", "groupPermissions", "groupCollectionPermissions"],
				populateWhere: "infer",
				fields,
			},
		);

		return groups;
	}

	verifyPermissions(
		user: UserEntity,
		groups: GroupEntity[],
		permissions: GROUP_PERMISSION[] = [],
	) {
		const verified =
			user.superadmin ||
			groups.some((group) => {
				return group.groupPermissions
					.map((entity) => permissions.includes(entity.permission))
					.some((el) => !!el);
			});

		if (!verified) {
			const collectionKeys = groups.flatMap((group) =>
				group.groupCollectionPermissions.map((perm) => perm.collection.id),
			);
			return !collectionKeys.length ? false : collectionKeys;
		}
		return true;
	}
}
