document.getElementById("run-query").addEventListener("click", function () {
  var query = document.getElementById("sql-query").value;
  var endpoint = query.trim().toLowerCase().startsWith("select")
    ? "/query"
    : "/modify";
  fetch(`http://localhost:3000${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: query, params: [] }),
  })
    .then((response) => response.json())
    .then((data) => {
      const resultElement = document.getElementById("query-result");
      resultElement.innerHTML = "";
      if (endpoint === "/query") {
        if (Array.isArray(data) && data.length > 0) {
          const table = createTable(data);
          resultElement.appendChild(table);
        } else {
          resultElement.innerHTML = "<p>No data to display.</p>";
        }
      } else {
        resultElement.innerHTML = `<p>${data.affectedRows} rows affected.</p>`;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      const resultElement = document.getElementById("query-result");
      resultElement.innerHTML = "<p>Error loading data.</p>";
    });
});

function createTable(data) {
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
  return table;
}
