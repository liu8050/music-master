import { TemplateRef } from '@angular/core';
export declare class CardFooterComponent {
    prefixCls: string;
    content: string | TemplateRef<void>;
    extra: string | TemplateRef<void>;
    cardFooterWrapper: boolean;
    constructor();
    isTemplateRef(value: any): boolean;
}
