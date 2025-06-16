import { Document, Schema, Model, model } from 'mongoose';
import { PasswordUtils } from '../../utils/password.utils';
import { IRoleModel } from './role.model';


export interface IUserModel extends Document{
    _id: string;
	fullname: string;
    email: string;
	mobile: string;
    password: string;
	token: string;
	roles: IRoleModel[] | string[];
	status: number;
	createdAt: number;
	updatedAt: number;
}
const types = Schema.Types;
const userSchema: Schema = new Schema( {
	fullname: { type: types.String, required: true },
	email: { type: types.String, unique: true, required: true, index: true },
	mobile: { type: types.String, unique: true, required: true, index: true },
	password: { type: types.String, required: true, select: false },
	token: { type: types.String, unique: true, required: false, index: true, select: false },
	roles: { type: [types.ObjectId], required: true, ref: 'Role' },
	status: { type: types.Number, required: true, enum:[0, 1], default: 0  }
} , {
	timestamps: true,
	toJSON: { virtuals: true }
} );

/* eslint-disable */
userSchema.pre<any>( 'save', async function ( next: any ) {
	if ( this.password && this.isModified('password') ) {
        try {
            this.password = await PasswordUtils.hashPassword( this.password );
            return next();
        }catch(e) {
            return next(e);
        }
    }
    return next();  
} );


userSchema.set( 'toJSON', {
	transform ( doc, ret, opt ) {
		delete ret['password'];
		delete ret['token'];
		return ret;
	}
} );

const userModel: Model<IUserModel> = model<IUserModel>( 'User', userSchema );
export default userModel;