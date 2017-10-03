function contains(context, element, text, message) {
  let matches = context.$(element).text().match(new RegExp(text));
  message = message || `${element} should contain "${text}"`;

  this.pushResult({
    result: !!matches,
    actual: matches,
    expected: text,
    message
  });
}

export default contains;
