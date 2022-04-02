const url = 'https://api.le-systeme-solaire.net/rest/bodies/';

document.getElementById('title').addEventListener('click', () => {
	location.reload()
});

const insertAnimation = (numberOfMoons) => {
	let box = document.createElement('div');
	box.classList.add('box');
	let planet = document.createElement('div');
	planet.classList.add('planet');
	box.appendChild(planet);

	if (numberOfMoons > 6) {
		numberOfMoons = 6;
	}

	for (let i=1; i <= numberOfMoons; i++) {
		let circle = document.createElement('div');
		circle.classList.add(`circle${i}`);
		box.appendChild(circle);
	}

	return box;
}

const getPlanetInfo = (id) => {
	const planetUrl = `https://api.le-systeme-solaire.net/rest/bodies/${id}`;
	fetch(planetUrl).then((response) => response.json()).then((jsonObject) => {

		const cards = document.querySelectorAll('.card');
		cards.forEach(item => {
			item.style.display = 'none';
		});

        let planet = document.createElement('div');
        let planetName = document.createElement('h2');
        planetName.textContent = jsonObject.englishName;

        let cont = document.createElement('div');
        cont.classList.add('planet-info');

        let specs1 = document.createElement('div');
        specs1.classList.add('specs');
        let specs2 = document.createElement('div');
        specs2.classList.add('specs');
        let moonList = document.createElement('div');
        moonList.classList.add('moon-list');
        let specs3 = document.createElement('div');
        specs3.classList.add('specs');

        let gravity = document.createElement('p');
        gravity.innerHTML = `Gravity: ${jsonObject.gravity} m.s<sup>-2<sup>`;
        specs1.appendChild(gravity);

        let density = document.createElement('p');
        density.innerHTML = `Density: ${jsonObject.density} g.cm<sup>3</sup>`;
        specs1.appendChild(density);

        let mass = document.createElement('p');
        mass.innerHTML = `Mass: ${jsonObject.mass.massValue} x 10<sup>${jsonObject.mass.massExponent}</sup> kg`;
        specs1.appendChild(mass);

        let anomoly = document.createElement('p');
        if (jsonObject.mainAnomoly !== null) {
            anomoly.textContent = `Main Anaomoly: ${jsonObject.mainAnomaly} degrees`;
        } else {
            anomoly.textContent = "None";
        }
        specs3.appendChild(anomoly);

        let temp = document.createElement('p');
        temp.textContent = `Average Temp: ${jsonObject.avgTemp} K`;
        specs2.appendChild(temp);

        let tilt = document.createElement('p');
		tilt.textContent = `Axial Tilt: ${jsonObject.axialTilt}`;
		specs2.appendChild(tilt);

        let discovery = document.createElement('p');
        if (jsonObject.discoveryDate) {
            discovery.textContent = `Discovered On: ${jsonObject.discoveryDate}`;
        } else {
            discovery.textContent = "Discovered On: N/A";
        }
        specs2.appendChild(discovery);

		let numberOfMoons;
        if (jsonObject.moons !== null) {
            numberOfMoons = jsonObject.moons.length;
            let p1 = document.createElement('p');
            p1.innerHTML = "MOONS: &nbsp;";
            moonList.appendChild(p1);

			jsonObject.moons.forEach(moon => {
	            let p2 = document.createElement('p');
	            p2.innerHTML = `${moon.moon} &nbsp;&nbsp;`;
	            moonList.appendChild(p2);
	        });
	    } else {
	        numberOfMoons = 0;
	        let p2 = document.createElement('p');
            p2.textContent = 'MOONS: None';
            moonList.appendChild(p2);
	    }


	    planet.appendChild(insertAnimation(numberOfMoons));
        planet.appendChild(planetName);
        planet.appendChild(cont);
        cont.appendChild(specs1);
        cont.appendChild(specs2);
        cont.appendChild(moonList);
        cont.appendChild(specs3);

        let container = document.getElementById('planet-information');
        container.appendChild(planet);
	})
}

const getAllPlanets = (url) => {
	fetch(url).then((response) => response.json()).then((jsonObject) => {

    	const object = jsonObject.bodies;

    	let container = document.getElementById('planet-cards');

    	object.forEach(item => {
    		let card = document.createElement('div');
    		card.classList.add('card');

    		let planetName = document.createElement('h2');

    		if (item.isPlanet) {
    			planetName.textContent = item.englishName;
    			card.appendChild(planetName);
    			let numberOfMoons;
    			if (item.moons !== null) {
    				numberOfMoons = item.moons.length;
    			} else {
    				numberOfMoons = 0;
    			}
    			card.appendChild(insertAnimation(numberOfMoons));

                let p = document.createElement('p');
                p.textContent = `Moons: ${numberOfMoons}`;
                card.appendChild(p);

                card.addEventListener('click', () => {
					getPlanetInfo(item.id);
                });
    			container.appendChild(card);
    		}
    	});
    });
}

getAllPlanets(url);