export const usernameGenerator = (email: string) => {
  const username = email.split("@")[0];
  const randomNum = Math.floor(Math.random() * 1000);
  return `${username}${randomNum}`;
};

export const validateUsername = (text: string) => {
  const pattern = /^(?!.*404)[a-zA-Z0-9][a-zA-Z0-9._]*[a-zA-Z0-9]$/;
  return pattern.test(text);
};
