/**
 * Get user id from storage
 */
export const getUserId = () => localStorage.getItem("userId");

/**
 * Store item to storage
 */
export const saveToStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

/**
 * Clear storage
 */
export const clear = () => {
  localStorage.removeItem("userId");
};
