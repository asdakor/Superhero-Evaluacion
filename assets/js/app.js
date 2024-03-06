$(document).ready(function () {
    const form = $("#formulario")
    const encontrado = $('#encontrado')

    form.on("submit", function (event) {
        const superheroid = +$("#superheroid").val()
        event.preventDefault()

        if (superheroid > 0 && superheroid < 732) {
            getSuperhero(superheroid)
            $("#msjError").text('Superheroe encontrado !!').css('color', 'green')
        } else {
            $("#msjError").text('Error debe ser un numero entre 1 y 731 !!!').css('color', 'red')
        }



    })




    const getSuperhero = function (id) {

        $.ajax({
            url: `https://www.superheroapi.com/api.php/4905856019427443/${id}`,
            method: "GET",
            success(data) {
                const superheroinfo = {
                    img: data.image.url,
                    nombre: data.name,
                    connections: Object.values(data.connections)[0],
                    publicado: data.biography.publisher,
                    ocupacion: data.work.occupation,
                    aparicion: Object.values(data.biography)[4],
                    altura: data.appearance.height[0] + ' ' + data.appearance.height[1],
                    peso: data.appearance.weight[0] + ' ' + data.appearance.weight[1],
                    alianzas: data.biography.aliases
                }
                const superherostats = {
                    poder: data.powerstats.power,
                    durability: data.powerstats.durability,
                    combat: data.powerstats.combat,
                    speed: data.powerstats.speed,
                    strength: data.powerstats.strength,
                    intelligence: data.powerstats.intelligence
                }
                encontrado.html(
                    `
                    <div class="row">
            <div class="col-12 col-lg-6">
                <h2>Super Heroe encontrado</h2>
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${superheroinfo.img}" class="img-fluid rounded-start" alt="...">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">Nombre: ${superheroinfo.nombre} </h5>
                          <p class="card-text">Conexiones: ${superheroinfo.connections} </p>
                          <p class="card-text">Publicado por: ${superheroinfo.publicado} </p>
                          <p class="card-text">Ocupacion: ${superheroinfo.ocupacion} </p>
                          <p class="card-text">Primera aparicion: ${superheroinfo.aparicion} </p>
                          <p class="card-text">Altura: ${superheroinfo.altura} </p>
                          <p class="card-text">Peso: ${superheroinfo.peso} </p>
                          <p class="card-text">Alianzas: ${superheroinfo.alianzas} </p>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
            <div id="grafico" class="col-12 col-lg-6">
                <div id="chartContainer" style="height: 300px; width: 100%;"></div>

            </div>

        </div>
        `
                )
                let chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light2",
                    title: {
                        text: "Estadisticas del poder"
                    },
                    data: [
                        {
                            type: "pie",
                            showInLegend: true,
                            legendText: "{indexLabel}",
                            dataPoints: []
                        }
                    ]
                });
                chart.options.data[0].dataPoints = [
                    { y: superherostats.poder, indexLabel: `Power (${superherostats.poder})` },
                    { y: superherostats.durability, indexLabel: `durability (${superherostats.durability})` },
                    { y: superherostats.combat, indexLabel: `combat (${superherostats.combat})` },
                    { y: superherostats.speed, indexLabel: `speed (${superherostats.speed})` },
                    { y: superherostats.strength, indexLabel: `strength (${superherostats.strength})` },
                    { y: superherostats.intelligence, indexLabel: `intelligence (${superherostats.intelligence})` },
                ];
                chart.render();
            },
            error(error) {
                console.log(error)
            }
        })
    }
});
