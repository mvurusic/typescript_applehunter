
export class RandomArray{
  public static RandomSingle(array:any) {
    return array[Math.floor(Math.random() * array.length)]
  }
  
  public static RandomMultiple(array:any, count:number) {
    let len = array.length;
    let lookup = [];
    let tmp = [];
  
    if (count > len) { count = len; }
  
    for (let i = 0; i < count; i++) {
      let index;
      do {
        index = ~~(Math.random() * len);
      } while (index in lookup);
      lookup[index] = null;
      tmp.push(array[index]);
    }
    return tmp;
  }

  // TODO: find out how that works!
  // public static RandomSingleCryptoStrong(array:any) {
  //   return crypto.getRandomValues(array);
  // }
  
  // TODO: not working... use an other approach!
  // public static GetRandomDifferent(array:any, last = undefined) {
  //   if (array.length === 0) {
  //     return;
  //   } else if (array.length === 1) {
  //     return array[0];
  //   } else {
  //     let num = 0;
  //     do {
  //       num = Math.floor(Math.random() * array.length);
  //     } while (array[num] === last);
  //     return array[num];
  //   }
  // }
}