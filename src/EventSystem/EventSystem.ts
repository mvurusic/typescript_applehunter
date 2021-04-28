//export namespace EventSys {
export class EventSystemT0 {
  private actions: Array<() => void> = new Array<() => void>();
  private actionReceivers: Array<() => void> = new Array<() => void>();

  public AddListener(receiver:any, action: any): void {
    this.actions.push(action);
    this.actionReceivers.push(receiver);
  }
  // receiver is here only needed for consistency to AddListener,
  // because often receiver and action are mistaken here
  public RemoveListener(receiver: any, action: any): void {
    const index = this.actions.indexOf(action, 0);
    if (index > -1) {
      this.actions.splice(index, 1);
      this.actionReceivers.splice(index, 1);
    }
  }
  public Invoke(): void {
    for (let i = 0; i < this.actions.length; i++) {
      this.actions[i].call(this.actionReceivers[i]);
    }
  }
  public HasListeners(): boolean {
    return this.actions.length > 0;
  }
}

export class EventSystemT1<T1> {
  private actions: Array<(data:T1) => void> = new Array<(data:T1) => void>();
  private actionReceivers: Array<() => void> = new Array<() => void>();

  public AddListener(receiver: any, action: any): void {
    this.actions.push(action);
    this.actionReceivers.push(receiver);
  }
  // receiver is here only needed for consistency to AddListener,
  // because often receiver and action are mistaken here
  public RemoveListener(receiver: any, action: any): void {
    const index = this.actions.indexOf(action, 0);  
    if (index > -1) {
      this.actions.splice(index, 1);
      this.actionReceivers.splice(index, 1);
    }
  }
  public Invoke(data: T1): void {
    for (let i = 0; i < this.actions.length; i++) {
      this.actions[i].call(this.actionReceivers[i], data);
    }
  }
  public HasListeners(): boolean {
    return this.actions.length > 0;
  }
}

export class EventSystemT2<T1, T2> {
  private actions: Array<(data1: T1, data2: T2) => void> = new Array<(data1: T1, data2: T2) => void>();
  private actionReceivers: Array<() => void> = new Array<() => void>();
  public AddListener(receiver: any, action: any): void {
    this.actions.push(action);
    this.actionReceivers.push(receiver);
  }
  // receiver is here only needed for consistency to AddListener,
  // because often receiver and action are mistaken here
  public RemoveListener(receiver: any, action: any): void {
    const index = this.actions.indexOf(action, 0);
    if (index > -1) {
      this.actions.splice(index, 1);
      this.actionReceivers.splice(index, 1);
    }
  }
  public Invoke(data1: T1, data2: T2): void {
    try {
      for (let i = 0; i < this.actions.length; i++) {
        this.actions[i].call(this.actionReceivers[i], data1, data2);
      }
    } catch (ex) {
      console.log("Event Error: " + ex);
    }
  }
  public HasListeners(): boolean {
    return this.actions.length > 0;
  }
}
//}
