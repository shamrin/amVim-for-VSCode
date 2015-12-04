import {IMode} from './IMode'
import * as MotionsCharacter from '../Motions/Character';

export class ModesNormal implements IMode {
	input(key: string) {
		// TODO
		if (key === 'h') {
			MotionsCharacter.left();
		}
		else if (key === 'l') {
			MotionsCharacter.right();
		}
		else if (key === 'k') {
			MotionsCharacter.up();
		}
		else if (key === 'j') {
			MotionsCharacter.down();
		}
	}
}