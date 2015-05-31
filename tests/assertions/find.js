function find(context, element, count = -1, message = null) {
  let found = context.$(element).length;
  let bool;
  let _message;

  if (count < 0) {
    bool = found > 0;
    _message = `${element} should be found`;
  } else {
    bool = found === count;
    let times = count === 1 ? 'time' : 'times';
    _message = `${element} should only be found ${count} ${times}`;
  }

  this.push(bool, found, found, message || _message);
}

export default find;
