$(document).ready(function () {
    const form = $("#formulario")
    const encontrado = $('#encontrado')

    form.on("submit", function (event) {
        const superheroid = +$("#superheroid").val()
        event.preventDefault()

        if (superheroid > 0 && superheroid < 732) {

            console.log("Es correcta la busqueda")
            getSuperhero(superheroid)

        } else {

            console.log("No es correcto")

        }



    })




    const getSuperhero = function (id) {

        $.ajax({
            url: `https://www.superheroapi.com/api.php/4905856019427443/${id}`,
            method: "GET",
            success(data) {
                const superhero = {
                    img: data.image.url,
                    nombre: data.name,
                    connections: Object.values(data.connections)[0],
                    publicado: data.biography.publisher,
                    ocupacion: data.work.occupation,
                    aparicion: Object.values(data.biography)[4],
                    altura: data.appearance.height[0] +' '+data.appearance.height[1],
                    peso: data.appearance.weight[0] +' '+ data.appearance.weight[1],
                    alianzas: data.biography.aliases
                }
                encontrado.html(
                    `
                    <div class="row">
            <div class="col-12 col-lg-6">
                <h2>Super Heroe encontrado</h2>
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${superhero.img}" class="img-fluid rounded-start" alt="...">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">Nombre: ${superhero.nombre} </h5>
                          <p class="card-text">Conexiones: ${superhero.connections} </p>
                          <p class="card-text">Publicado por: ${superhero.publicado} </p>
                          <p class="card-text">Ocupacion: ${superhero.ocupacion} </p>
                          <p class="card-text">Primera aparicion: ${superhero.aparicion} </p>
                          <p class="card-text">Altura: ${superhero.altura} </p>
                          <p class="card-text">Peso: ${superhero.peso} </p>
                          <p class="card-text">Alianzas: ${superhero.alianzas} </p>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
            <div class="col-12 col-lg-6">
                <h2>Estadisticad de poder</h2>
            </div>

        </div>
                    `
                )
                console.log(data.name)
                console.log(Object.values(data.connections)[0])
                console.log(data.biography.publisher)
                console.log(data.work.occupation)
                console.log(Object.values(data.biography)[4])
                console.log(data.appearance.height[0], data.appearance.height[1])
                console.log(data.appearance.weight[0], data.appearance.weight[1])
                console.log(data.biography.aliases)


            },
            error(error) {
                console.log(error)
            }

        })
    }



});