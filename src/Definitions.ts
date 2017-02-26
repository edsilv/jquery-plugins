///<reference path="../node_modules/typescript/lib/lib.es6.d.ts"/> 

interface JQueryStatic {
    mlp: any;
}

interface JQuery {
    checkboxButton(onClicked: (checked: boolean) => void): void;
    disable(): void;
    ellipsis(chars: number): string;
    ellipsisFill(text?: string): any;
    ellipsisFixed(chars: number, buttonText: string): any;
    ellipsisHtmlFixed(chars: number, callback: () => void): any;
    enable(): void;
    equaliseHeight(reset?: boolean, average?: boolean): any;
    getVisibleElementWithGreatestTabIndex(): any;
    horizontalMargins(): number;
    horizontalPadding(): number;
    ismouseover(): boolean;
    leftMargin(): number;
    leftPadding(): number;
    on(events: string, handler: (eventObject: JQueryEventObject, ...args: any[]) => any, wait: Number): JQuery;
    onEnter(callback: () => void): any;
    onPressed(callback: (e: any) => void): any;
    removeLastWord(chars?: number, depth?: number): any;
    rightMargin(): number;
    rightPadding(): number;
    swapClass(removeClass: string, addClass: string): void;
    targetBlank(): void;
    toggleClass(class1: string, class2: string): any;
    toggleExpandText(chars: number, callback?: () => void): void;
    toggleExpandTextByLines(lines: number, lessText: string, moreText: string, callback: () => void): any;
    toggleText(text1: string, text2: string): any;
    updateAttr(attrName: string, oldVal: string, newVal: string): void;
    verticalMargins(): number;
    verticalPadding(): number;
}

// declare var Length: Length;

// interface Length{
//     toPx(elem, value, prop?, force?): number;
// }
