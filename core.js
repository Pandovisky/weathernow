window.addEventListener('load', ()=> {
    let longitude;
    let latitude;
    var dia = 'dia'
    var noite = "noite"

    function setIcons (icon, IconID){
        const skycons = new Skycons ({color: "white"});
        const currenticon = icon;
        skycons.play();
        return skycons.set(IconID, Skycons[currenticon]);
    }

    function settime (hours) {
        console.log(hours)
        let now
        if (hours === dia){
            now = 1;
        } else if (hours === noite){
            now = 2;
        }

            if (now === 1) {
                document.getElementById('background').classList.add('day');
            } else {
                document.getElementById('background').classList.add('night');
            }
    }

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            

            const api = `https://api.hgbrasil.com/weather?format=json-cors&fields=only_results,temp,city_name,forecast,condition_slug,description,currently&key=46c62685&lat=${latitude}&log=${longitude}`;
            fetch(api)
            .then(response => {

                return response.json();
            })
            .then(data =>{
                document.querySelector('#temp').innerHTML = data.temp;
                document.querySelector('#place').innerHTML = data.city_name;
                document.querySelector('#description').innerHTML = data.description;
                setIcons(data.condition_slug, document.querySelector('.icon'));
                settime(data.currently)
            })
        })
        }
    });