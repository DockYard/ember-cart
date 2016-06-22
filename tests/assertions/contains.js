function contains(context, element, text, message) {
  let matches = context.$(element).text().match(new RegExp(text));
  message = message || `${element} should contain "${text}"`;

  this.push(!!matches, matches, text, message);
}

export default contains;
