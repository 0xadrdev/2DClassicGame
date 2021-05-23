const table = document.getElementById("myTable");

const p = document.getElementById("playersNumber");
var array = [];

async function getScore() {

  const response = await fetch("/score");

  data = await response.json();

  function compare(a, b) {
    const scoreA = a.score;
    const scoreB = b.score;

    let comparison = 0;
    if (scoreA > scoreB) {
      comparison = -1;
    } else if (scoreA < scoreB) {
      comparison = 1;
    }
    return comparison;
  }

  data.sort(compare);
  p.innerText = `Numero de jugadores: ${data.length-1}`;
  console.log(data)
  console.log(data[0].date);
  for (var i = 1; i < data.length; i++) {
    var row = `<tr>
                  <td><strong>${i}</strong></td>
                  <td>${data[i].user}</td>
                  <td>${data[i].score}</td>
                  <td>${data[i].fecha}</td>

                </tr>`;

    table.innerHTML += row;
  }
}

getScore();
