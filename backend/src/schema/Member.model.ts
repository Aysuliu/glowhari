import mongoose, {Schema} from 'mongoose';
import { MemberStatus, MemberType, SkinType } from '../libs/enums/member.enum';

const memberSchema = new Schema({
    memberType: {
        type: String,
        enum: MemberType,
        default: MemberType.CUSTOMER,
    },

    memberStatus: {
        type: String,
        enum: MemberStatus,
        default: MemberStatus.ACTIVE,
    },

    memberNick: {
        type: String,
        index: {unique: true, sparse: true},
        required: true,
    },

    memberPhone: {
        type: String,
        index: {unique: true, sparse: true},
        required: true,
    },

    memberPassword: {
        type: String,
        select: false,
        required: true,
    },

    memberAddress: {
        type: String,
    },

    memberDesc: {
        type: String,
    },

    memberImage: {
        type: String,
    },

    memberPoints: {
        type: Number,
        default: 0,
    },

    memberEmail: {
        type: String,
    },

    skinType: {
        type: String,
        enum: SkinType,
    },

    skinConcerns: {
        type: [String],
        default: [],
    },
},
{timestamps: true}
);

export default mongoose.model('Member', memberSchema);
