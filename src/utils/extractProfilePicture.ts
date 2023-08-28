export const extractProfilePicture = (picture: number[]) => {
  if (!picture) return "";
  const base64String = picture
    ?.map((byte: number) => String.fromCharCode(byte))
    .join("");
  return `data:image/jpeg;base64,${btoa(base64String)}`;
};
