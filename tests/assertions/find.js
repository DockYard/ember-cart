function find(context, element, count = -1, message = null) {
  let found = context.$(element).length;
  let result, _message;

  if (count < 0) {
    result = found > 0;
    _message = `${element} should be found`;
  } else {
    result = found === count;
    let times = count === 1 ? 'time' : 'times';
    _message = `${element} should only be found ${count} ${times}`;
  }

  this.pushResult({
    result,
    actual: found,
    expected: found,
    message: message || _message
  });
}

export default find;
