const generateButton = document.getElementById("generate");
const content = document.getElementById("markdown-content");

generateButton.addEventListener("click", async () => {
  const input = document.getElementById("input-url");
  const inputValue = input.value;

  if (inputValue) {
    await fetchSummaryApi(inputValue);
  } else {
    alert("The input field is empty. You have to provide an url.");
  }
});

async function fetchSummaryApi(input) {
  const response = await fetch("http://127.0.0.1:8000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: input }),
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });

    // TODO: format the markdown
    chunk.split("\n\n").forEach((event) => {
      if (event.startsWith("data:")) {
        result += event.replace(/^data:\s?/, "");
        content.innerHTML = marked.parse(result);
      }
    });
  }
}
