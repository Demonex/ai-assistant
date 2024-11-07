import {InjectModel} from 'nestjs-typegoose';
import PostEntity, {POST_STATUSES, PostEntityDefaultSelect} from '../entities/Post';
import {PaginateModel} from '@stigma-io/typegoose-cursor-pagination';
import {serialize} from '../utils/richtext/NewRichTextParser';
import type {SerializedLexicalNode} from '../utils/richtext/types';
import type {ReturnModelType} from '@typegoose/typegoose';
import PostMediaEntity from '../entities/Post/Media';

export class PostService {
  constructor(
    @InjectModel(PostEntity) private readonly repoPost: PaginateModel<PostEntity, typeof PostEntity>,
    @InjectModel(PostMediaEntity) private readonly repoPostMedia: ReturnModelType<typeof PostMediaEntity>
  ) {
  }

  async getAll(language, next?: string): Promise<any> {
    const {docs, ...rest} = await this.repoPost.findPaged({
        sortField: 'createdAt',
        limit: 30,
        next
      },
      {
        _status: POST_STATUSES.PUBLISHED
      },
      PostEntityDefaultSelect
    );
    return {
      docs: docs.map(item => {
        return {
          id: item.id,
          createdAt: item.createdAt,
          preview: item.preview,
          title: item.title[language],
          description: item.description[language]
        };
      }),
      ...rest
    };
  }

  async getPost(id: string, language): Promise<any> {
    const item = await this.repoPost.findOne({
        _id: id,
        _status: POST_STATUSES.PUBLISHED
      },
      {},
      [...PostEntityDefaultSelect, 'content']
    );
    return {
      id: item.id,
      createdAt: item.createdAt,
      preview: item.preview,
      title: item.title[language],
      description: item.description[language],
      content: serialize(item.content[language]?.root?.children, await this._getMedia(item.content[language]?.root?.children))
    };

  }

  private async _getMedia(children: SerializedLexicalNode[] = []): Promise<{ [k: string]: Object }> {
    const ids = children.reduce((prev, node) => {
      return node.type === 'upload' && node.relationTo === 'post-media' ? [...prev, node.value?.id].filter(Boolean) : prev;
    }, []);
    return (await this.repoPostMedia.find({
      _id: {$in: ids}
    })).reduce((prev, item) => ({...prev, [item.id]: item.toJSON()}), {});
  }

}
