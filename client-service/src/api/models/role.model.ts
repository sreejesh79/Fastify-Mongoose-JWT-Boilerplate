import UtilityScripts from '../../utils/utilityscripts';
import { Document, Schema, Model, model } from 'mongoose';


export interface IRoleModel extends Document {
	_id: string;
    name: string;
    machine_name: string;
}

const types: typeof Schema.Types = Schema.Types;

const roleSchema: Schema = new Schema( {
	name: { type: types.String, required: true },
	machine_name: { type: types.String, required: true, unique: true, index: true }
} );

/* eslint-disable */

roleSchema.pre<IRoleModel>( 'validate', function ( next: any ) {
	this.machine_name = UtilityScripts.machine_name( this.name );
	next();
} );


const RoleModel: Model<IRoleModel> = model<IRoleModel>( 'Role', roleSchema );
export default RoleModel;


