export const updateObject = (
  oldObject: object,
  updatedProperties: object
): any => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const calculateBMI = (w: number, h: number) => {
  const BMI = +(w / ((h / 100) * (h / 100))).toFixed(1);
  return BMI;
};

export const calculateBMR = (
  w: number,
  h: number,
  a: number,
  g: string
): number => {
  if (g === "male") {
    const BMR = Math.round(66.47 + 13.7 * w + 5 * h - 6.76 * a);
    return BMR;
  } else {
    const BMR = Math.round(655.1 + 9.567 * w + 1.85 * h - 4.68 * a);
    return BMR;
  }
};

export const calculateTEE = (BMR: number, a: string) => {
  if (a === "low") {
    const TEE = Math.round(BMR * 1.2);
    return TEE;
  } else if (a === "normal") {
    const TEE = Math.round(BMR * 1.4);
    return TEE;
  } else {
    const TEE = Math.round(BMR * 1.6);
    return TEE;
  }
};
export const calculateTotalCalories = (TEE: number, g: string) => {
  if (g === "gain") {
    const total = TEE + 300;
    return total;
  } else if (g === "loose") {
    const total = TEE - 300;
    return total;
  } else {
    const total = TEE;
    return total;
  }
};
