document.getElementById("run-query").addEventListener("click", function () {
  var query = document.getElementById("sql-query").value;
  fetch("http://localhost:3000/run-query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: query }),
  })
    .then((response) => response.json())
    .then((data) => {
      const resultElement = document.getElementById("query-result");
      resultElement.innerHTML =
        "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
