import { EntityManager } from "@mikro-orm/core";
import {
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	Scope,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { UserEntity } from "@repo/backend/entities/User/index.js";
import { HttpStatusMessages } from "@repo/backend/messages/http.js";
import { get } from "lodash-es";

@Injectable({ scope: Scope.REQUEST })
export class UserService {
	constructor(
		@Inject(REQUEST) private readonly request,
		private readonly em: EntityManager,
	) {}

	async me(id: number, email?: string, disablePayloadFormatting = false) {
		const isAdminRequest =
			String(get(this.request, "headers.referer", "")).includes("/admin") &&
			!disablePayloadFormatting;
		if (!id && !isAdminRequest) {
			throw new HttpException(
				{
					statusCode: HttpStatus.UNAUTHORIZED,
					messages: [
						{
							messages: [HttpStatusMessages.UNAUTHORIZED],
						},
					],
				},
				HttpStatus.UNAUTHORIZED,
			);
		}
		if (!id && isAdminRequest) {
			return { user: null };
		}
		const user = await this.findByIdOrEmail(id, email);
		if (!user) {
			if (!isAdminRequest) {
				throw new HttpException(
					{
						statusCode: HttpStatus.UNAUTHORIZED,
						messages: [
							{
								messages: [HttpStatusMessages.UNAUTHORIZED],
							},
						],
					},
					HttpStatus.UNAUTHORIZED,
				);
			}
			try {
				await new Promise((resolve) => {
					this.request.session.destroy(() => resolve(true));
				});
			} catch (err) {
				console.error(err.message);
			}
		}
		return isAdminRequest && user
			? {
					collection: "user",
					user: {
						id: user._id,
						email: user.email,
						roles: user.roles,
						_strategy: "cookie",
					},
				}
			: user;
	}

	async findByIdOrEmail(
		_id: number,
		email?: string,
		fields: (keyof UserEntity)[] = [],
	) {
		if (!_id && !email) return null;

		const select = await this.em.findOne<UserEntity>(
			UserEntity,
			_id && email
				? [
						{
							id: _id,
						},
						{
							email,
						},
					]
				: _id
					? { id: _id }
					: { email },
			{
				fields,
			},
		);

		return select;
	}
}

/* async findById(id?: Types.ObjectId): Promise<UserEntity | null> {
    if (!id) return null;
    return this.repo.findById(id).select(UserEntityDefaultSelect);
  } */

/* async findByIdAndUpdate(
    id: Types.ObjectId,
    args: UpdateProfileDto,
  ): Promise<any | null> {
    const keys = ["email", "name", "language"];
    const data = Object.fromEntries(
      Object.entries(args).filter(([_, __]) => {
        switch (_) {
          default:
            return keys.includes(_);
        }
      }),
    );
    const getUser = () => this.repo.findById(id).select(["email", "providers"]);
    let userData: any;
    const { providersSafe } = args;
    if (data.email || (Array.isArray(providersSafe) && providersSafe.length)) {
      userData = await getUser();
    }
    if (data.email) {
      const oldEmail = get(userData || (await getUser()), "email");
      if (data.email !== oldEmail) {
        data.emailVerified = false;
      }
    }
    if (Array.isArray(providersSafe)) {
      const providers = get(userData || (await getUser()), "providers");
      data.providers = (Array.isArray(providers) ? providers : []).reduce<
        string[]
      >((prev, provider) => {
        const providerSafe = provider.split("_").shift();
        if (providersSafe.includes(providerSafe)) {
          return [...prev, provider];
        }
        return prev;
      }, []);
    }
    try {
      const user = (
        await this.repo
          .findByIdAndUpdate(id, data, { new: true })
          .select(UserEntityDefaultSelect)
      ).toJSON();
      if (!user) return null;
      this.request.session.user.language = user.language;
      this.request.session.user.email = user.email;

      return user;
    } catch (e) {
      console.error(e.message);
      switch (e.code) {
        case 11000: {
          if ("username" in e.keyValue)
            throw new HttpException(
              {
                statusCode: HttpStatus.BAD_REQUEST,
                messages: [
                  {
                    property: "username",
                    messages: [HttpStatusMessages.USERNAME_ALREADY_EXIST],
                  },
                ],
              },
              HttpStatus.BAD_REQUEST,
            );
          break;
        }
      }
      throw new Error("Internal server error");
    }
  }*/

/*
  async findByIdAndDelete(userId: Types.ObjectId): Promise<boolean> {
    try {
      await this.repo.findByIdAndDelete(userId);
      await new Promise((resolve, reject) => {
        this.request.session.destroy((err) =>
          err ? reject(err) : resolve(true),
        );
      });
    } catch (err) {
      console.error(err.message);
      //
    }
    return true;
  }*/
