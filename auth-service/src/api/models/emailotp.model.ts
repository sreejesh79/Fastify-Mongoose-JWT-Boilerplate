import { Document, Schema, Model, model } from 'mongoose';

export interface IEmailOtpModel extends Document {
    _id: string;
	fullname: string;
    email: string;
    otp: string;
    otpToken: string;
    otpExpiry: number;
    createdAt: number;
    updatedAt: number;
}

const types: typeof Schema.Types = Schema.Types;

const otpSchema: Schema = new Schema( {
	email: { type: types.String, unique: true, required: true, index: true },
	fullname: { type: types.String, required: true },
	otp: { type: types.String, unique: true, required: true, index: true },
	otpToken: { type: types.String, unique: true, required: true,  index: true  },
	otpExpiry: { type: types.Number, unique: true, required: true, index: true }
}, { timestamps: true } );

/* eslint-disable */
otpSchema.set( 'toJSON', {
	transform ( doc, ret, opt ) {
		delete ret['otp'];
		return ret;
	}
} );

const emailOTPModel: Model<IEmailOtpModel> = model<IEmailOtpModel>( 'EmailOtp', otpSchema );
export default emailOTPModel;