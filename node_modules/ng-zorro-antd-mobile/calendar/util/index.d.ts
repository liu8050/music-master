import { DateModels } from '../date/DataTypes';
export declare const mergeDateTime: (date?: Date, time?: Date) => Date;
export declare const formatDate: (date: Date, format: string, locale?: DateModels.Locale) => string;
export declare const isSameDate: (day_one: Date, day_two: Date) => boolean | "need two params";
