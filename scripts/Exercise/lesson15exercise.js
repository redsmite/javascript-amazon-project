
export function isWeekend(date){
  const formatWeekday = date.format('dddd');
  let boolean;

  formatWeekday === 'Saturday' || formatWeekday === 'Sunday' 
    ? boolean = true
    : boolean = false;

    return boolean
}
