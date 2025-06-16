
/* eslint-disable */

import bcrypt from 'bcryptjs';

export class PasswordUtils {

	public  static hashPassword = async ( password: string ): Promise<any> => {
		const rounds = 10;
		const salt = await bcrypt.genSalt( rounds );
		const passwordHash: string = await bcrypt.hash( password, salt );
		return passwordHash;
	};

	public static comparePassword = async ( password: string, hash: string ): Promise<boolean> => {
		const isValid: boolean = await bcrypt.compare( password, hash );
		return isValid;
	};
}