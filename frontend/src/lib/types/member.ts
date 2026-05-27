import { MemberStatus, MemberType, SkinType } from "../enums/member.enum";

export interface Member {
    _id: string;
    memberType: MemberType;
    memberStatus: MemberStatus;
    memberNick: string;
    memberPhone: string;
    memberAddress?: string;
    memberDesc?: string;
    memberImage?: string;
    memberPoints: number;
    memberEmail?: string;
    skinType?: SkinType;
    skinConcerns?: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface MemberInput {
    memberNick: string;
    memberPhone: string;
    memberPassword: string;
    memberEmail?: string;
    skinType?: SkinType;
}

export interface LoginInput {
    memberNick: string;
    memberPassword: string;
}

export interface MemberUpdateInput {
    memberNick?: string;
    memberPhone?: string;
    memberAddress?: string;
    memberDesc?: string;
    memberImage?: string;
    memberEmail?: string;
    skinType?: SkinType;
    skinConcerns?: string[];
}
