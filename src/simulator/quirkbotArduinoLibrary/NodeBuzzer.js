import {
	DISCONNECTED
} from './core/board'
import {
	Node,
	Input,
} from './CommonNodeIncludes'

export class Buzzer extends Node {
	nodeType = 'Buzzer'

	constructor(...args) {
		super(...args)

		this.registerInput(this.note)
		this.registerInput(this.place)

		this.note.set(NO_NOTE)
		this.place.set(DISCONNECTED)
	}

	note = new Input()

	place = new Input()

	static MAX_FREQUENCY = 4978.0;

	getInternalData() {
		return {
			nodeType     : this.nodeType,
			id           : this.getTypedId(),
			place        : this.place.get(),
			note         : this.note.get(),
			maxFrequency : this.MAX_FREQUENCY,
		}
	}
}
/**
Notes generated via JavaScript:
-------------------------------
var freq = {'NOTE_B0':31,'NOTE_C1':33,'NOTE_CS1':35,'NOTE_D1':37,'NOTE_DS1':39,
'NOTE_E1':41,'NOTE_F1':44,'NOTE_FS1':46,'NOTE_G1':49,'NOTE_GS1':52,'NOTE_A1':55,
'NOTE_AS1':58,'NOTE_B1':62,'NOTE_C2':65,'NOTE_CS2':69,'NOTE_D2':73,
'NOTE_DS2':78,'NOTE_E2':82,'NOTE_F2':87,'NOTE_FS2':93,'NOTE_G2':98,
'NOTE_GS2':104,'NOTE_A2':110,'NOTE_AS2':117,'NOTE_B2':123,'NOTE_C3':131,
'NOTE_CS3':139,'NOTE_D3':147,'NOTE_DS3':156,'NOTE_E3':165,'NOTE_F3':175,
'NOTE_FS3':185,'NOTE_G3':196,'NOTE_GS3':208,'NOTE_A3':220,'NOTE_AS3':233,
'NOTE_B3':247,'NOTE_C4':262,'NOTE_CS4':277,'NOTE_D4':294,'NOTE_DS4':311,
'NOTE_E4':330,'NOTE_F4':349,'NOTE_FS4':370,'NOTE_G4':392,'NOTE_GS4':415,
'NOTE_A4':440,'NOTE_AS4':466,'NOTE_B4':494,'NOTE_C5':523,'NOTE_CS5':554,
'NOTE_D5':587,'NOTE_DS5':622,'NOTE_E5':659,'NOTE_F5':698,'NOTE_FS5':740,
'NOTE_G5':784,'NOTE_GS5':831,'NOTE_A5':880,'NOTE_AS5':932,'NOTE_B5':988,
'NOTE_C6':1047,'NOTE_CS6':1109,'NOTE_D6':1175,'NOTE_DS6':1245,'NOTE_E6':1319,
'NOTE_F6':1397,'NOTE_FS6':1480,'NOTE_G6':1568,'NOTE_GS6':1661,'NOTE_A6':1760,
'NOTE_AS6':1865,'NOTE_B6':1976,'NOTE_C7':2093,'NOTE_CS7':2217,'NOTE_D7':2349,
'NOTE_DS7':2489,'NOTE_E7':2637,'NOTE_F7':2794,'NOTE_FS7':2960,'NOTE_G7':3136,
'NOTE_GS7':3322,'NOTE_A7':3520,'NOTE_AS7':3729,'NOTE_B7':3951,'NOTE_C8':4186,
'NOTE_CS8':4435,'NOTE_D8':4699,'NOTE_DS8':4978};
var s = '';
for(var note in freq){
	s += "#define " + note + ' ';
	s += Math.sqrt(freq[note]/4978);
	s += "\n";
}
console.log(s);
* */
export const NO_NOTE = 0.0
export const NOTE_B0 = 0.07891388067048084
export const NOTE_C1 = 0.08141970486742799
export const NOTE_CS1 = 0.08385067751022207
export const NOTE_D1 = 0.0862131306539059
export const NOTE_DS1 = 0.08851255094827871
export const NOTE_E1 = 0.09075372969523524
export const NOTE_F1 = 0.09401537704509885
export const NOTE_FS1 = 0.09612834597118733
export const NOTE_G1 = 0.0992134596034861
export const NOTE_GS1 = 0.10220549023329836
export const NOTE_A1 = 0.10511238700155717
export const NOTE_AS1 = 0.10794102819827782
export const NOTE_B1 = 0.11160108030368604
export const NOTE_C2 = 0.11426921191767299
export const NOTE_CS2 = 0.11773269872356801
export const NOTE_D2 = 0.12109716720544211
export const NOTE_DS2 = 0.1251756499912953
export const NOTE_E2 = 0.12834515537094357
export const NOTE_F2 = 0.13220022069857565
export const NOTE_FS2 = 0.13668285074370035
export const NOTE_G2 = 0.14030902014120522
export const NOTE_GS2 = 0.14454039043692143
export const NOTE_A2 = 0.14865136327101158
export const NOTE_AS2 = 0.15330823534994753
export const NOTE_B2 = 0.1571900708085198
export const NOTE_C3 = 0.16222142113076254
export const NOTE_CS3 = 0.16710134824884254
export const NOTE_D3 = 0.17184275282792028
export const NOTE_DS3 = 0.17702510189655743
export const NOTE_E3 = 0.18205999479153948
export const NOTE_F3 = 0.18749581487226938
export const NOTE_FS3 = 0.19277842069520448
export const NOTE_G3 = 0.1984269192069722
export const NOTE_GS3 = 0.20441098046659673
export const NOTE_A3 = 0.21022477400311435
export const NOTE_AS3 = 0.21634681916570375
export const NOTE_B3 = 0.22275170170099043
export const NOTE_C4 = 0.22941573387056177
export const NOTE_CS4 = 0.23589157951069348
export const NOTE_D4 = 0.24302235164477237
export const NOTE_DS4 = 0.2499497739824163
export const NOTE_E4 = 0.2574717137997702
export const NOTE_F4 = 0.26478005457383025
export const NOTE_FS4 = 0.2726298570800243
export const NOTE_G4 = 0.28061804028241044
export const NOTE_GS4 = 0.2887331189550632
export const NOTE_A4 = 0.29730272654202317
export const NOTE_AS4 = 0.3059606058404177
export const NOTE_B4 = 0.3150184775872267
export const NOTE_C5 = 0.32413311155391816
export const NOTE_CS5 = 0.333601070993634
export const NOTE_D5 = 0.34339313171465546
export const NOTE_DS5 = 0.3534823602780229
export const NOTE_E5 = 0.36384403653882996
export const NOTE_F5 = 0.374455544224199
export const NOTE_FS5 = 0.38555684139040897
export const NOTE_G5 = 0.3968538384139444
export const NOTE_GS5 = 0.4085762007901947
export const NOTE_A5 = 0.4204495480062287
export const NOTE_AS5 = 0.4326936383314075
export const NOTE_B5 = 0.44550340340198086
export const NOTE_C6 = 0.4586125073527341
export const NOTE_CS6 = 0.4719960095438428
export const NOTE_D6 = 0.4858380076802447
export const NOTE_DS6 = 0.5001004318579979
export const NOTE_E6 = 0.5147483363147967
export const NOTE_F6 = 0.529749745719235
export const NOTE_FS6 = 0.5452597141600486
export const NOTE_G6 = 0.5612360805648209
export const NOTE_GS6 = 0.5776401473367193
export const NOTE_A6 = 0.5946054530840463
export const NOTE_AS6 = 0.6120853316279143
export const NOTE_B6 = 0.6300369551744534
export const NOTE_C7 = 0.6484211439424312
export const NOTE_CS7 = 0.667352667007116
export const NOTE_D7 = 0.6869324970652553
export const NOTE_DS7 = 0.7071067811865476
export const NOTE_E7 = 0.727826088834819
export const NOTE_F7 = 0.7491792750598407
export const NOTE_FS7 = 0.7711136827808179
export const NOTE_G7 = 0.7937076768278888
export const NOTE_GS7 = 0.8169065305347813
export const NOTE_A7 = 0.8408990960124574
export const NOTE_AS7 = 0.8655033347705805
export const NOTE_B7 = 0.8908940710779707
export const NOTE_C8 = 0.917005975892863
export const NOTE_CS8 = 0.9438856118259953
export const NOTE_D8 = 0.9715726400726432
export const NOTE_DS8 = 1
