import { Service, Inject } from 'fastify-decorators';
import { IUserBodyPayloadDTO, IUserQueryPayloadDTO } from '../dto/user.dto';
import userModel, { IUserModel } from '../models/user.model';

@Service()
class UserQueries {

	public addUser = async ( payload: IUserQueryPayloadDTO ): Promise<IUserModel> => {
		const newUser: IUserModel = await userModel.create( payload );
		return newUser;
	};

	public getAll = async (): Promise<IUserModel[]> => {
		const users: IUserModel[] = await userModel.find()
			.lean()
			.exec();
		return users;
	};

	public getById = async ( id: string ): Promise<IUserModel> => {
		const user: IUserModel = await userModel.findById( id )
			.lean()
			.exec();
		return user;
	};

	public update = async ( id: string, payload: IUserBodyPayloadDTO ): Promise<IUserModel> => {
		const user: IUserModel = await userModel.findByIdAndUpdate( id, payload, {
			new: true
		} );
		return user;
	};

	public delete = async ( id: string ): Promise<IUserModel> => {
		const deletedUser: IUserModel = await userModel.findByIdAndDelete( id );
		return deletedUser;
	};

	public updateRefreshToken = async ( id: string, token: string ): Promise<IUserModel> => {
		const updatedUser: IUserModel = await userModel.findByIdAndUpdate(
			id,
			{ token },
			{
				new: true
			}
		);
		await updatedUser.populate( 'roles' );
		
		return updatedUser?.toObject();
	};

	public clearToken = async (id: string): Promise<IUserModel> => {
		const updatedUser: IUserModel = await userModel.findByIdAndUpdate(
			id,
			{ token: '' },
			{
				new: true
			}
		).lean().exec();
		return updatedUser;
	}

	public getByEmail = async ( email: string ): Promise<IUserModel> => {
		const user: IUserModel = await userModel.findOne( {
			email
		} ).lean().exec();
		return user;
	};

	public getIdByEmail = async ( email: string ): Promise<IUserModel> => {
		const user: IUserModel = await userModel.findOne( { email } )
			.select( ['_id', 'email'] )
			.lean()
			.exec();
		return user;
	};

	public getPasswordByEmail = async ( email: string ): Promise<IUserModel> => {
		const user: IUserModel = await userModel.findOne( { email } )
			.select( ['password', 'email'] )
			.exec();
		return user;
	};

	public getUserByTokeAndEmail = async ( token: string, email: string ): Promise<IUserModel> => {
		const user: IUserModel = await userModel.findOne( { token, email } )
			.select( ['_id', 'email'] )
			.exec();
		return user;
	}

	public getUserByToken = async ( token: string ): Promise<IUserModel> => {
		const user: IUserModel = await userModel.findOne( { token } )
			.select( ['_id', 'email'] )
			.lean()
			.exec();
		return user;
	}

}

export default UserQueries;