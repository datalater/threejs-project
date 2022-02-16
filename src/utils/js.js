/**
 * @link https://stackoverflow.com/questions/38435450/get-current-function-name-in-strict-mode/38435618
 */
export const getFunctionName = () => {
  const stack = new Error().stack;
  const stackLines = stack.split("\n");
  const stackLine = stackLines[2];
  const match = stackLine.match(/at (.*) \(/);

  return match[1].split(" ")[1];
};
