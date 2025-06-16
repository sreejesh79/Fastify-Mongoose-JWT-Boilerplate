/* eslint-disable */

class UtilityScripts {

    public static machine_name(name: string): string {
        return name.toLowerCase().replace(" ", "_");
    }

    public static generateOTP = (): string => {
		const otpGenerator = require( 'otp-generator' );
		const otp: string = otpGenerator.generate( 6, { lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false } );
		console.log('otp', otp);
		return otp;
	};

    public static generateExpiry = (expiry: number): number => {
		const currentDate = new Date();
		const futureDate = new Date(currentDate.getTime() + expiry * 60000);
		const expiryTime: number = futureDate.getTime();
		return expiryTime;
	}

	public staticvalidateMobile = (mobile: string): boolean => {
		const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  		return regex.test(mobile);
	}

}

export default UtilityScripts;
