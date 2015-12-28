import {window, Position} from 'vscode';
import {Motion} from './Motion';

enum MotionMatchDirection {NEXT, PREV};

export class MotionMatch extends Motion {

    private character: string;
    private direction: MotionMatchDirection;

    static next(args: {character: string}): Motion {
        const obj = new MotionMatch();
        obj.character = args.character;
        obj.direction = MotionMatchDirection.NEXT;
        return obj;
    }

    static prev(args: {character: string}): Motion {
        const obj = new MotionMatch();
        obj.character = args.character;
        obj.direction = MotionMatchDirection.PREV;
        return obj;
    }

    apply(from: Position, option: {inclusive: boolean} = {inclusive: false}): Position {
        from = super.apply(from);

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor || this.direction === undefined || ! this.character) {
            return from;
        }

        const document = activeTextEditor.document;

        let toLine = from.line;
        let toCharacter = from.character;

        let targetText = document.lineAt(toLine).text;

        if (this.direction === MotionMatchDirection.NEXT) {
            targetText = targetText.substr(toCharacter + 1);

            const offset = targetText.indexOf(this.character);
            toCharacter += !!~offset ? offset + 1 : 0;

            if (option.inclusive) {
                toCharacter += 1;
            }
        }

        else if (this.direction === MotionMatchDirection.PREV) {
            targetText = targetText
                .substr(0, toCharacter)
                .split('').reverse().join('');

            const offset = targetText.indexOf(this.character);
            toCharacter -= !!~offset ? offset + 1 : 0;
        }

        return new Position(toLine, toCharacter);
    }

}