/**
 * @param {() => boolean} message - Prints console log message
 * @param {string} alert - Prints console error message - "err"
 */
export default function log(message,alert) {
  let t = performance.now();
  return alert === "err" ? console.error(`ERROR: ${message} ${t}ms`) : console.log(`${message} ${t}ms`);
};