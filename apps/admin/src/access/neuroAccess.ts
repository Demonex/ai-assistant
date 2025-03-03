import { GROUP_PERMISSIONS } from "@/types/types";
import { getUserContext, getUserGroups } from "@/utilities/defaultAccess";
import { parse } from "cookie";

export const getNeuroAccess = () => {
	// const groups = await payload.find({
	// 	collection: "group",
	// 	where: {
	// 		tenant: {
	// 			equals: tenant,
	// 		},
	// 		or: [
	// 			{
	// 				admins: {
	// 					contains: user.id,
	// 				},
	// 			},
	// 			{
	// 				users: {
	// 					contains: user.id,
	// 				},
	// 			},
	// 		],
	// 	},
	// 	select: {
	// 		groupPermissions: true,
	// 		collectionPermissions: true
	// 	},
	// });

	// const access = groups.docs.some(
	// 	(doc) =>
	// 		doc.groupPermissions.includes(GROUP_PERMISSIONS.collection) ||
	// 		doc.groupPermissions.includes(GROUP_PERMISSIONS.admin),
	// );

	// console.log(

	// 	groups.docs.flatMap(doc => {
	// 		return doc.collectionPermissions?.map(perm => {
	// 			console.log(perm, perm.collection);

	// 			return perm.collection
	// 		})
	// 	})
	// );

	const create = async ({ req }) => {
		const { user } = await getUserContext({ req });

		// const tenant = parse(req.headers.get("cookie") || "")?.tenant;
		// console.log('t',tenant)
		// if (!tenant) {
		// 	return false
		// }

		const defaultAccess = {
			// tenant: {
			// 	equals: tenant,
			// }
		};

		if (user?.superadmin) {
			return defaultAccess;
		}

		const { groups } = await getUserGroups({ req });

		const hasAccess = groups.docs.some(
			(doc) =>
				doc.groupPermissions.includes(GROUP_PERMISSIONS.collection) ||
				doc.groupPermissions.includes(GROUP_PERMISSIONS.admin),
		);

		if (hasAccess) {
			return defaultAccess;
		}

		console.log(
			groups.docs.flatMap((doc) => {
				return doc.collectionPermissions?.map((perm) => {
					console.log(perm, perm.collection);

					return perm.collection;
				});
			}),
		);

		return false;
	};

	const read = async ({ req }) => {
		return await create({ req });
	};

	const update = async ({ req }) => {
		return await create({ req });
	};

	const _delete = async ({ req }) => {
		return await create({ req });
	};

	return {
		create,
		read,
		update,
		delete: _delete,
	};
};
