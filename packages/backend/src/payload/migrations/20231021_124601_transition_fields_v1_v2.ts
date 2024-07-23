import type {
  MigrateUpArgs,
  MigrateDownArgs
} from '@stigma-io/payload-db-mongodb';

export async function up({payload}: MigrateUpArgs): Promise<void> {
  // Migration code
  const collection = payload.config.collections.find(({slug}) => slug === 'transition');
  if (!collection) {
    return;
  }
  const TransitionModel = payload.db.collections[collection.slug];
  const docs = await TransitionModel.find();
  await Promise.all(docs.map(async ({_id, from, to}) => {
    await TransitionModel.updateOne({_id}, {
      from: from,
      to: to
    });
  }));
};

export async function down({payload}: MigrateDownArgs): Promise<void> {
  // Migration code
};
