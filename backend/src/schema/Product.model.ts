import mongoose, {Schema} from 'mongoose';
import { ProductSize, ProductCollection, ProductStatus } from '../libs/enums/product.enum';
import { SkinType } from '../libs/enums/member.enum';

const productSchema = new Schema({
    productStatus: {
        type: String,
        enum: ProductStatus,
        default: ProductStatus.PAUSE,
    },

    productCollection: {
        type: String,
        enum: ProductCollection,
        required: true,
    },

    productName: {
        type: String,
        required: true,
    },

    productPrice: {
        type: Number,
        required: true,
    },

    productLeftCount: {
        type: Number,
        required: true,
    },

    productSize: {
        type: String,
        enum: ProductSize,
        default: ProductSize.ML_100,
    },

    productDesc: {
        type: String,
    },

    productImages: {
        type: [String],
        default: [],
    },

    productViews: {
        type: Number,
        default: 0,
    },

    productBrand: {
        type: String,
    },

    productSkinType: {
        type: [String],
        enum: SkinType,
        default: [],
    },

    productIngredients: {
        type: String,
    },
},
{timestamps: true}
);

productSchema.index({productName: 1, productSize: 1}, {unique: true});

export default mongoose.model('Product', productSchema);
