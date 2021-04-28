import * as EventSystem  from "./EventSystem/EventSystem";
import {DictionaryN} from "./MyCollections/DictionaryN";
import {Dictionary} from "./MyCollections/Dictionary";
import * as Collections from "./Collections";

export class EventOut_OnKeyDown extends EventSystem.EventSystemT1<keyCode> {};
// export class EventOut_OnKeyPress extends EventSystem.EventSystemT1<keyCode> {};
export class EventOut_OnKeyUp extends EventSystem.EventSystemT1<keyCode> {};


export class InputControls {

  public static EventOut_OnKeyDown:EventOut_OnKeyDown = new EventOut_OnKeyDown();
  // public static EventOut_OnKeyPress:EventOut_OnKeyPress = new EventOut_OnKeyPress();
  public static EventOut_OnKeyUp:EventOut_OnKeyUp = new EventOut_OnKeyUp();

  private codes:DictionaryN<KeyCode> = new DictionaryN<KeyCode>();
  private codesByKey:Dictionary<KeyCode> = new Dictionary<KeyCode>();
  private buttonsPressed:Collections.LinkedList<keyCode> = new Collections.LinkedList<keyCode>();

  public Init():void {
    this.CreateKeyCodesDictionary();
    this.RegisterKeyPress();
  }

  private RegisterKeyPress():void {
    window.addEventListener('keydown', (event) => { this.InvokeKeyEvent(event, InputControls.EventOut_OnKeyDown); });
    // window.addEventListener('keypress', (event) => { this.InvokeKeyEvent(event, InputControls.EventOut_OnKeyPress); });
    window.addEventListener('keyup', (event) => { this.InvokeKeyEvent(event, InputControls.EventOut_OnKeyUp); });
  }

  private InvokeKeyEvent(event:KeyboardEvent, eventToInvoke:EventSystem.EventSystemT1<keyCode> ) {
    //console.log("KEY UP: " + event.type + " " + event.which + " " + event.key + " " + event.isComposing + " " + event.metaKey);
    if(this.codesByKey.ContainsKey(event.key)) {
      let key:keyCode = this.codesByKey.GetValue(event.key).keyNr;
      if((event.type === 'keydown' && !this.buttonsPressed.contains(key)) ||
        ((event.type === 'keyup') && this.buttonsPressed.contains(key))) {
        eventToInvoke.Invoke(key);
        // console.log("EVENT: " + key + " " + event.type);
        if(event.type === 'keyup') {
          // console.log("RELEASED: " + key);
          this.buttonsPressed.remove(key);
        }
        else if(event.type === 'keydown') {
          // console.log("PRESSED: " + key);
          this.buttonsPressed.add(key);
        }
      }
    }
  }

  private CreateKeyCodesDictionary() {
    this.codes.Clear()
    this.codes.Add(8, { name:'backspace', keyNr:8, eventKey:'Backspace', eventCode:'Backspace', notes:'' });
    this.codes.Add(9, { name:'tab', keyNr:9, eventKey:'Tab', eventCode:'Tab', notes:'' });
    this.codes.Add(13, { name:'enter', keyNr:13, eventKey:'Enter', eventCode:'Enter', notes:'' });
    this.codes.Add(16, { name:'shift(left)', keyNr:16, eventKey:'Shift', eventCode:'ShiftLeft', notes:'event.shiftKey is true' });
   // this.codes.Add(16, { name:'shift(right)', keyNr:16, eventKey:'Shift', eventCode:'ShiftRight', notes:'event.shiftKey is true' });
    this.codes.Add(17, { name:'ctrl(left)', keyNr:17, eventKey:'Control', eventCode:'ControlLeft', notes:'event.ctrlKey is true' });
    //this.codes.Add(17, { name:'ctrl(right)', keyNr:17, eventKey:'Control', eventCode:'ControlRight', notes:'event.ctrlKey is true' });
    this.codes.Add(18, { name:'alt(left)', keyNr:18, eventKey:'Alt', eventCode:'AltLeft', notes:'event.altKey is true' });
    //this.codes.Add(18, { name:'alt(right)', keyNr:18, eventKey:'Alt', eventCode:'AltRight', notes:'event.altKey is true' });
    this.codes.Add(19, { name:'pause/break', keyNr:19, eventKey:'Pause', eventCode:'Pause', notes:'' });
    this.codes.Add(20, { name:'caps lock', keyNr:20, eventKey:'CapsLock', eventCode:'CapsLock', notes:'' });
    this.codes.Add(27, { name:'escape', keyNr:27, eventKey:'Escape', eventCode:'Escape', notes:'' });
    this.codes.Add(32, { name:'space', keyNr:32, eventKey:'', eventCode:'Space', notes:'The event.key value is a single space.' });
    this.codes.Add(33, { name:'page up', keyNr:33, eventKey:'PageUp', eventCode:'PageUp', notes:'' });
    this.codes.Add(34, { name:'page down', keyNr:34, eventKey:'PageDown', eventCode:'PageDown', notes:'' });
    this.codes.Add(35, { name:'end', keyNr:35, eventKey:'End', eventCode:'End', notes:'' });
    this.codes.Add(36, { name:'home', keyNr:36, eventKey:'Home', eventCode:'Home', notes:'' });
    this.codes.Add(37, { name:'left arrow', keyNr:37, eventKey:'ArrowLeft', eventCode:'ArrowLeft', notes:'' });
    this.codes.Add(38, { name:'up arrow', keyNr:38, eventKey:'ArrowUp', eventCode:'ArrowUp', notes:'' });
    this.codes.Add(39, { name:'right arrow', keyNr:39, eventKey:'ArrowRight', eventCode:'ArrowRight', notes:'' });
    this.codes.Add(40, { name:'down arrow', keyNr:40, eventKey:'ArrowDown', eventCode:'ArrowDown', notes:'' });
    this.codes.Add(44, { name:'print screen', keyNr:44, eventKey:'PrintScreen', eventCode:'PrintScreen', notes:'' });
    this.codes.Add(45, { name:'insert', keyNr:45, eventKey:'Insert', eventCode:'Insert', notes:'' });
    this.codes.Add(46, { name:'delete', keyNr:46, eventKey:'Delete', eventCode:'Delete', notes:'' });
    this.codes.Add(48, { name:'0', keyNr:48, eventKey:'0', eventCode:'Digit0', notes:'' });
    this.codes.Add(49, { name:'1', keyNr:49, eventKey:'1', eventCode:'Digit1', notes:'' });
    this.codes.Add(50, { name:'2', keyNr:50, eventKey:'2', eventCode:'Digit2', notes:'' });
    this.codes.Add(51, { name:'3', keyNr:51, eventKey:'3', eventCode:'Digit3', notes:'' });
    this.codes.Add(52, { name:'4', keyNr:52, eventKey:'4', eventCode:'Digit4', notes:'' });
    this.codes.Add(53, { name:'5', keyNr:53, eventKey:'5', eventCode:'Digit5', notes:'' });
    this.codes.Add(54, { name:'6', keyNr:54, eventKey:'6', eventCode:'Digit6', notes:'' });
    this.codes.Add(55, { name:'7', keyNr:55, eventKey:'7', eventCode:'Digit7', notes:'' });
    this.codes.Add(56, { name:'8', keyNr:56, eventKey:'8', eventCode:'Digit8', notes:'' });
    this.codes.Add(57, { name:'9', keyNr:57, eventKey:'9', eventCode:'Digit9', notes:'' });
    this.codes.Add(65, { name:'a', keyNr:65, eventKey:'a', eventCode:'KeyA', notes:'' });
    this.codes.Add(66, { name:'b', keyNr:66, eventKey:'b', eventCode:'KeyB', notes:'' });
    this.codes.Add(67, { name:'c', keyNr:67, eventKey:'c', eventCode:'KeyC', notes:'' });
    this.codes.Add(68, { name:'d', keyNr:68, eventKey:'d', eventCode:'KeyD', notes:'' });
    this.codes.Add(69, { name:'e', keyNr:69, eventKey:'e', eventCode:'KeyE', notes:'' });
    this.codes.Add(70, { name:'f', keyNr:70, eventKey:'f', eventCode:'KeyF', notes:'' });
    this.codes.Add(71, { name:'g', keyNr:71, eventKey:'g', eventCode:'KeyG', notes:'' });
    this.codes.Add(72, { name:'h', keyNr:72, eventKey:'h', eventCode:'KeyH', notes:'' });
    this.codes.Add(73, { name:'i', keyNr:73, eventKey:'i', eventCode:'KeyI', notes:'' });
    this.codes.Add(74, { name:'j', keyNr:74, eventKey:'j', eventCode:'KeyJ', notes:'' });
    this.codes.Add(75, { name:'k', keyNr:75, eventKey:'k', eventCode:'KeyK', notes:'' });
    this.codes.Add(76, { name:'l', keyNr:76, eventKey:'l', eventCode:'KeyL', notes:'' });
    this.codes.Add(77, { name:'m', keyNr:77, eventKey:'m', eventCode:'KeyM', notes:'' });
    this.codes.Add(78, { name:'n', keyNr:78, eventKey:'n', eventCode:'KeyN', notes:'' });
    this.codes.Add(79, { name:'o', keyNr:79, eventKey:'o', eventCode:'KeyO', notes:'' });
    this.codes.Add(80, { name:'p', keyNr:80, eventKey:'p', eventCode:'KeyP', notes:'' });
    this.codes.Add(81, { name:'q', keyNr:81, eventKey:'q', eventCode:'KeyQ', notes:'' });
    this.codes.Add(82, { name:'r', keyNr:82, eventKey:'r', eventCode:'KeyR', notes:'' });
    this.codes.Add(83, { name:'s', keyNr:83, eventKey:'s', eventCode:'KeyS', notes:'' });
    this.codes.Add(84, { name:'t', keyNr:84, eventKey:'t', eventCode:'KeyT', notes:'' });
    this.codes.Add(85, { name:'u', keyNr:85, eventKey:'u', eventCode:'KeyU', notes:'' });
    this.codes.Add(86, { name:'v', keyNr:86, eventKey:'v', eventCode:'KeyV', notes:'' });
    this.codes.Add(87, { name:'w', keyNr:87, eventKey:'w', eventCode:'KeyW', notes:'' });
    this.codes.Add(88, { name:'x', keyNr:88, eventKey:'x', eventCode:'KeyX', notes:'' });
    this.codes.Add(89, { name:'y', keyNr:89, eventKey:'y', eventCode:'KeyY', notes:'' });
    this.codes.Add(90, { name:'z', keyNr:90, eventKey:'z', eventCode:'KeyZ', notes:'' });
    this.codes.Add(91, { name:'left window key', keyNr:91, eventKey:'Meta', eventCode:'MetaLeft', notes:'event.metaKey is true' });
    this.codes.Add(92, { name:'right window key', keyNr:92, eventKey:'Meta', eventCode:'MetaRight', notes:'event.metaKey is true' });
    this.codes.Add(93, { name:'select key (Context Menu)', keyNr:93, eventKey:'ContextMenu', eventCode:'ContextMenu', notes:'' });
    this.codes.Add(96, { name:'numpad 0', keyNr:96, eventKey:'0', eventCode:'Numpad0', notes:'' });
    this.codes.Add(97, { name:'numpad 1', keyNr:97, eventKey:'1', eventCode:'Numpad1', notes:'' });
    this.codes.Add(98, { name:'numpad 2', keyNr:98, eventKey:'2', eventCode:'Numpad2', notes:'' });
    this.codes.Add(99, { name:'numpad 3', keyNr:99, eventKey:'3', eventCode:'Numpad3', notes:'' });
    this.codes.Add(100, { name:'numpad 4', keyNr:100, eventKey:'4', eventCode:'Numpad4', notes:'' });
    this.codes.Add(101, { name:'numpad 5', keyNr:101, eventKey:'5', eventCode:'Numpad5', notes:'' });
    this.codes.Add(102, { name:'numpad 6', keyNr:102, eventKey:'6', eventCode:'Numpad6', notes:'' });
    this.codes.Add(103, { name:'numpad 7', keyNr:103, eventKey:'7', eventCode:'Numpad7', notes:'' });
    this.codes.Add(104, { name:'numpad 8', keyNr:104, eventKey:'8', eventCode:'Numpad8', notes:'' });
    this.codes.Add(105, { name:'numpad 9', keyNr:105, eventKey:'9', eventCode:'Numpad9', notes:'' });
    this.codes.Add(106, { name:'multiply', keyNr:106, eventKey:'*', eventCode:'NumpadMultiply', notes:'' });
    this.codes.Add(107, { name:'add', keyNr:107, eventKey:'+', eventCode:'NumpadAdd', notes:'' });
    this.codes.Add(109, { name:'subtract', keyNr:109, eventKey:'-', eventCode:'NumpadSubtract', notes:'' });
    this.codes.Add(110, { name:'decimal point', keyNr:110, eventKey:'.', eventCode:'NumpadDecimal', notes:'' });
    this.codes.Add(111, { name:'divide', keyNr:111, eventKey:'/', eventCode:'NumpadDivide', notes:'' });
    this.codes.Add(112, { name:'f1', keyNr:112, eventKey:'F1', eventCode:'F1', notes:'' });
    this.codes.Add(113, { name:'f2', keyNr:113, eventKey:'F2', eventCode:'F2', notes:'' });
    this.codes.Add(114, { name:'f3', keyNr:114, eventKey:'F3', eventCode:'F3', notes:'' });
    this.codes.Add(115, { name:'f4', keyNr:115, eventKey:'F4', eventCode:'F4', notes:'' });
    this.codes.Add(116, { name:'f5', keyNr:116, eventKey:'F5', eventCode:'F5', notes:'' });
    this.codes.Add(117, { name:'f6', keyNr:117, eventKey:'F6', eventCode:'F6', notes:'' });
    this.codes.Add(118, { name:'f7', keyNr:118, eventKey:'F7', eventCode:'F7', notes:'' });
    this.codes.Add(119, { name:'f8', keyNr:119, eventKey:'F8', eventCode:'F8', notes:'' });
    this.codes.Add(120, { name:'f9', keyNr:120, eventKey:'F9', eventCode:'F9', notes:'' });
    this.codes.Add(121, { name:'f10', keyNr:121, eventKey:'F10', eventCode:'F10', notes:'' });
    this.codes.Add(122, { name:'f11', keyNr:122, eventKey:'F11', eventCode:'F11', notes:'' });
    this.codes.Add(123, { name:'f12', keyNr:123, eventKey:'F12', eventCode:'F12', notes:'' });
    this.codes.Add(144, { name:'num lock', keyNr:144, eventKey:'NumLock', eventCode:'NumLock', notes:'' });
    this.codes.Add(145, { name:'scroll lock', keyNr:145, eventKey:'ScrollLock', eventCode:'ScrollLock', notes:'' });
    this.codes.Add(173, { name:'audio volume mute', keyNr:173, eventKey:'AudioVolumeMute', eventCode:'', notes:'The event.which value is 181 in Firefox. Also FF provides the code value as, VolumeMute' });
    this.codes.Add(174, { name:'audio volume down', keyNr:174, eventKey:'AudioVolumeDown', eventCode:'', notes:'The event.which value is 182 in Firefox. Also FF provides the code value as, VolumeDown' });
    this.codes.Add(175, { name:'audio volume up', keyNr:175, eventKey:'AudioVolumeUp', eventCode:'', notes:'The event.which value is 183 in Firefox. Also FF provides the code value as, VolumeUp' });
    this.codes.Add(181, { name:'media player', keyNr:181, eventKey:'LaunchMediaPlayer', eventCode:'', notes:'The ️event.which value is 0(no value) in Firefox. Also FF provides the code value as, MediaSelect' });
    this.codes.Add(182, { name:'launch application 1', keyNr:182, eventKey:'LaunchApplication1', eventCode:'', notes:'The ️event.which value is 0(no value) in Firefox. Also FF provides the code value as, LaunchApp1' });
    this.codes.Add(183, { name:'launch application 2', keyNr:183, eventKey:'LaunchApplication2', eventCode:'', notes:'The ️event.which value is 0(no value) in Firefox. Also FF provides the code value as, LaunchApp2' });
    this.codes.Add(186, { name:'semi-colon', keyNr:186, eventKey:';', eventCode:'Semicolon', notes:'The event.which value is 59 in Firefox' });
    this.codes.Add(187, { name:'equal sign', keyNr:187, eventKey:'=', eventCode:'Equal', notes:'The event.which value is 61 in Firefox' });
    this.codes.Add(188, { name:'comma', keyNr:188, eventKey:',', eventCode:'Comma', notes:'' });
    this.codes.Add(189, { name:'dash', keyNr:189, eventKey:'-', eventCode:'Minus', notes:'The event.which value is 173 in Firefox' });
    this.codes.Add(190, { name:'period', keyNr:190, eventKey:'.', eventCode:'Period', notes:'' });
    this.codes.Add(191, { name:'forward slash', keyNr:191, eventKey:'/', eventCode:'Slash', notes:'' });
    this.codes.Add(192, { name:'Backquote/Grave accent', keyNr:192, eventKey:'`', eventCode:'Backquote', notes:'' });
    this.codes.Add(219, { name:'open bracket', keyNr:219, eventKey:'[', eventCode:'BracketLeft', notes:'' });
    this.codes.Add(220, { name:'back slash', keyNr:220, eventKey:'\\', eventCode:'Backslash', notes:'' });
    this.codes.Add(221, { name:'close bracket', keyNr:221, eventKey:']', eventCode:'BracketRight', notes:'' });
    this.codes.Add(222, { name:'single quote', keyNr:222, eventKey:'\'', eventCode:'Quote', notes:'' });

    this.codesByKey.Clear();
    this.codes.Keys().forEach((i) => this.codesByKey.Add(this.codes.GetValue(i).eventKey, this.codes.GetValue(i)));
  }
}

export interface KeyCode { name: string ; keyNr: number; eventKey: string, eventCode: string, notes:string }

export enum keyCode {
  BACKSPACE = 8,
  TAB = 9,
  ENTER = 13,
  SHIFT = 16,
  CTRL = 17,
  ALT = 18,
  PAUSE = 19,
  CAPS_LOCK = 20,
  ESCAPE = 27,
  SPACE = 32,
  PAGE_UP = 33,
  PAGE_DOWN = 34,
  END = 35,
  HOME = 36,
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  RIGHT_ARROW = 39,
  DOWN_ARROW = 40,
  INSERT = 45,
  DELETE = 46,
  KEY_0 = 48,
  KEY_1 = 49,
  KEY_2 = 50,
  KEY_3 = 51,
  KEY_4 = 52,
  KEY_5 = 53,
  KEY_6 = 54,
  KEY_7 = 55,
  KEY_8 = 56,
  KEY_9 = 57,
  KEY_A = 65,
  KEY_B = 66,
  KEY_C = 67,
  KEY_D = 68,
  KEY_E = 69,
  KEY_F = 70,
  KEY_G = 71,
  KEY_H = 72,
  KEY_I = 73,
  KEY_J = 74,
  KEY_K = 75,
  KEY_L = 76,
  KEY_M = 77,
  KEY_N = 78,
  KEY_O = 79,
  KEY_P = 80,
  KEY_Q = 81,
  KEY_R = 82,
  KEY_S = 83,
  KEY_T = 84,
  KEY_U = 85,
  KEY_V = 86,
  KEY_W = 87,
  KEY_X = 88,
  KEY_Y = 89,
  KEY_Z = 90,
  LEFT_META = 91,
  RIGHT_META = 92,
  SELECT = 93,
  NUMPAD_0 = 96,
  NUMPAD_1 = 97,
  NUMPAD_2 = 98,
  NUMPAD_3 = 99,
  NUMPAD_4 = 100,
  NUMPAD_5 = 101,
  NUMPAD_6 = 102,
  NUMPAD_7 = 103,
  NUMPAD_8 = 104,
  NUMPAD_9 = 105,
  MULTIPLY = 106,
  ADD = 107,
  SUBTRACT = 109,
  DECIMAL = 110,
  DIVIDE = 111,
  F1 = 112,
  F2 = 113,
  F3 = 114,
  F4 = 115,
  F5 = 116,
  F6 = 117,
  F7 = 118,
  F8 = 119,
  F9 = 120,
  F10 = 121,
  F11 = 122,
  F12 = 123,
  NUM_LOCK = 144,
  SCROLL_LOCK = 145,
  SEMICOLON = 186,
  EQUALS = 187,
  COMMA = 188,
  DASH = 189,
  PERIOD = 190,
  FORWARD_SLASH = 191,
  GRAVE_ACCENT = 192,
  OPEN_BRACKET = 219,
  BACK_SLASH = 220,
  CLOSE_BRACKET = 221,
  SINGLE_QUOTE = 222
};