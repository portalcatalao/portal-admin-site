export type IState = {
    id?: number;
    name?: string;
    shortName?: string;
    region?: string;
    cities?: ICity[];
    addresses?: IAddress[];
}

export type ICity = {
    id?: number;
    ibgeId?: number;
    apiId?: number;
	name?: string;
    state?: IState;
    districts?: IDistrict[];
    addresses?: IAddress[];
}

export type IDistrict = {
    id?: number;
    apiId?: number;
    name?: string;
    city?: ICity;
    addresses?: IAddress[];
}

export type IAddress = {
    id?: string;
    nation?: string;
    state?: IState;
    city?: ICity;
    district?: IDistrict; 
    complement?: string;
    route?: string;
    number?: number;
    zipcode?: string;
    place_id?: string;
    formatted_address?: string;
    location?: any;
    property?: IProperty;
}

export type IPage = {
    id?: number;
    slug?: string;
    title?: string;
    subtitle?: string;
    content?: string;
    images?: Array<string>;
    name: string;
    realEstate?: IRealEstate;
}

export type IMenu = {
    id?: number;
    name: string;
    link?: string;
    submenus?: ISubmenu[];
    realEstate?: IRealEstate;
}

export type ISubmenu = {
    id?: number;
    name: string;
    link?: string;
    menu?: IMenu;
}

export type IUser = {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    cellPhone?: string;
    avatar?: string;
    document?: string;
    creci?: string;
    isGoogleAuth?: boolean;
    idGoogle?: string;
    realEstate?: IRealEstate;
    isRealEstate?: boolean;
    immobiles?: IProperty[];
    role?: any;
    focusAdType?: Array<string>;
}

export type IRealEstate = {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    cellPhone?: string;
    logo?: string;
    document?: string;
    creci?: string;
    realtors?: IUser[];
    immobiles?: IProperty[];
}

export type IProperty = {
    id?: string;
    cod?: string;
    type: string;
    adType: string;
    status?: string;
    value: string;
    thumbnail?: string;
    images?: Array<string>;
    video?: string;
    description?: string;
    commission?: string;
    remarks?: string;
    keyInformation?: string;
    numberRooms: number;
    numberBathrooms: number;
    numberSuites: number;
    numberGarages: number;
    totalArea: string;
    buildingArea: string;
    phoneOwner?: string;
    nameOwner?: string;
    unitOfMeasurement?: string;
    allowPets?: boolean;
    hasPool?: boolean;
    hasSolarEnergy?: boolean;
    hasSecuritySystem?: boolean;
    hasElectricFence?: boolean;
    hasBarbecue?: boolean;
    isFurnished?: boolean;
    isRoof?: boolean;
    isDeedRegistered?: boolean;
    showAddress?: boolean;
    condominiumValue?: string;
    iptu?: boolean;
    iptuValue?: string;
    concierge: string;
    keyType: string;
    relationship?: string;
    availability: string;
    furniture?: string[];
    owner?: IUser;
    realtor?: IUser;
    pickup?: IUser;
    realEstate?: IRealEstate;
    address?: IAddress;
    createdAt?: Date;
    updateAt?: Date;
    isFeatured?: boolean;
}

export interface IConfig {
    id?: number;
    phone?: string;
    creci?: string;
    whatsapp?: string;
    email?: string;
    address?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    metaCopyright?: string;
    metaTitle?: string;
    metaDescription?: string;
    propertyAddressShow?: boolean;
    realEstate?: IRealEstate;
    waterMark?: string;
}

interface IBannerType {
    id?: number;
    name: string;
    banners?: IBanner[];
    width?: number;
    height?: number;
}

export interface IBanner {
    id?: number;
    name?: string;
    link?: string;
    path: string;
    bannerType?: IBannerType;
    realEstate?: IRealEstate;
}

export interface ILead {
    id?: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    realEstate?: IRealEstate;
    realtor?: IUser;
    property?: IProperty;
    type?: string;

    //financing
    nance?: Date;
    document?: string;
    monthlyIncome?: string;
    married?: boolean;
    propertyPrice?: string;
    prohibited?: string;
    financingTime?: string;

    //visit
    time?: Date;
    date?: Date;
}