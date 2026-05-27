import {Types} from "mongoose";
type ObjectId = Types.ObjectId;
import { ViewGroup } from "../enums/view.enum";

export interface View{
    _id: ObjectId;
    viewGroup: ViewGroup;
    memberId: ObjectId;
    viewRef: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface ViewInput {
    memberId: ObjectId;
    viewRefId: ObjectId;
    viewGroup: ViewGroup;
}