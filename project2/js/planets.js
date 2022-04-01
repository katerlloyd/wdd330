const url = 'https://api.le-systeme-solaire.net/rest/bodies/';

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

//    				item.moons.forEach(moon => {
//                        let p2 = document.createElement('p');
//                        p2.textContent = moon.moon;
//                        card.appendChild(p2);
//    				});
    			} else {
    				numberOfMoons = 0;
    			}
    			card.appendChild(insertAnimation(numberOfMoons));

                let p = document.createElement('p');
                p.textContent = `Moons: ${numberOfMoons}`;
                card.appendChild(p);

                card.addEventListener('click', () => {

                    console.log(item.id);
                });
    			container.appendChild(card);
    		}
    	});
    });
}

getAllPlanets(url);