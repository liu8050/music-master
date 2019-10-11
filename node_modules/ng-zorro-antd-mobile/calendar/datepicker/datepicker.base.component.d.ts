import { DateModels } from '../date/DataTypes';
import { DatepickerPropsType } from './datepicker.props.component';
export interface DatepickerStateType {
    months: DateModels.MonthData[];
}
export declare class CalendarDatePickerBaseComponent {
    props: DatepickerPropsType;
    state: any;
    visibleMonth: DateModels.MonthData[];
    genMonthComponent: (data: any) => {};
    constructor();
    init(): void;
    receiveProps(oldValue: DatepickerPropsType, newValue: DatepickerPropsType): void;
    getMonthDate(date?: Date, addMonth?: number): {
        firstDate: Date;
        lastDate: Date;
    };
    canLoadPrev(): boolean;
    canLoadNext(): boolean;
    getDateWithoutTime: (date?: Date) => number;
    genWeekData: (firstDate: Date) => DateModels.CellData[][];
    genMonthData(date?: Date, addMonth?: number): DateModels.MonthData;
    inDate(date: number, tick: number): boolean;
    selectDateRange: (startDate: Date, endDate?: Date, clear?: boolean) => void;
    computeVisible: (clientHeight: number, scrollTop: number) => boolean;
    createOnScroll: () => (data: {
        full: number;
        client: number;
        top: number;
    }) => void;
    baseOnCellClick: (day: DateModels.CellData) => void;
}
