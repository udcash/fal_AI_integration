export async function removeBgFromFile(file, background_key) {
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_file", file);

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": background_key, // put this in api.json if you prefer
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`remove.bg failed: ${response.status} ${response.statusText}`);
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob); // for use as <img src="...">
}
