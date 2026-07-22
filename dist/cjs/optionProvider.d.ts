export interface DropdownStyles {
    position?: string;
    backgroundColor?: string;
    border?: string;
    listStyle?: string;
    padding?: string;
    margin?: string;
    width?: string;
    zIndex?: string;
    activeItemBackgroundColor?: string;
    itemPadding?: string;
    itemColor?: string;
    itemHoverBackgroundColor?: string;
    [key: string]: string | undefined;
}
export declare function optionProvider(event: Event, inputId: string, customStyles?: DropdownStyles): void;
//# sourceMappingURL=optionProvider.d.ts.map