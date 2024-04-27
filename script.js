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
      resultElement.innerHTML = "";
      if (Array.isArray(data) && data.length > 0) {
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        Object.keys(data[0]).forEach((key) => {
          const th = document.createElement("th");
          th.textContent = key;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        const tbody = document.createElement("tbody");
        data.forEach((item) => {
          const row = document.createElement("tr");
          Object.values(item).forEach((value) => {
            const td = document.createElement("td");
            td.textContent = value;
            row.appendChild(td);
          });
          tbody.appendChild(row);
        });
        table.appendChild(tbody);

        resultElement.appendChild(table);
      } else {
        console.log("gggg", data);
        resultElement.innerHTML = "<p>No data to display.</p>";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      const resultElement = document.getElementById("query-result");
      resultElement.innerHTML = "<p>Error loading data.</p>";
    });
});
