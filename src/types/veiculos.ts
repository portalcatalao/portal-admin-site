export interface IBrand {
    id?: number;
    name?: string;
    id_string?: string;
    ico?: string | null;
    type?: string;
    models?: IModel[];
}
export interface IModel {
    id?: number;
    brand?: IBrand;
    name?: string;
    id_string?: string;
    ico?: string | null;
    type?: string;
    versions?: IVersionModel[];
}
export interface IVersionModel {
    id?: number;
    model?: IModel;
    name?: string;
    id_string?: string;
    fipe_code?: string;
    type?: string;
    years?: IYearVersionModel[];
}
export interface IYearVersionModel {
    id?: number;
    versionModel?: IVersionModel;
    year_model?: number;
    price?: number;
    name?: string;
    code?: string;
    history?: string | null;
    last_update_at?: Date;
    reference_month?: string;
}