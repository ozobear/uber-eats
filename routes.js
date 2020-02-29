import restaurants from './restaurants'

module.exports = (app) => {

    let selected = [];

    app.get('zones/:zone', (req, res) => {

        let array = [];
        let restaurant;
        for (let i = 0; i < restaurants.length; i++) {
            if (req.params.zone == "south") {
                if (restaurants[i].zone === "south") {
                    restaurant = {
                        "restaurant": restaurants[i].name
                    }
                    array.push(restaurant)
                }
            }
            if (req.params.zone == "east") {
                if (restaurants[i].zone === "east") {
                    restaurant = {
                        "restaurant": restaurants[i].name
                    }
                    array.push(restaurant)
                }
            }
            if (req.params.zone == "center") {
                if (restaurants[i].zone === "center") {
                    restaurant = {
                        "restaurant": restaurants[i].name
                    }
                    array.push(restaurant)
                }
            }
            if (req.params.zone == "north") {
                if (restaurants[i].zone === "north") {
                    restaurant = {
                        "restaurant": restaurants[i].name
                    }
                    array.push(restaurant)
                }
            }
        }
        res.send(array)
    });

    app.get('/menu/:id', (req, res) => {
        let dish = restaurants.filter(rest => rest.id == req.params.id);
        res.send(dish[0].dishes);
    });

    app.get('/ordered', (req, res) => {
        res.send(selected);
    });

    app.post('/select/:id/:id_dish', (req, res) => {
        let dish = restaurants.filter(rest => rest.id == req.params.id);
        let selectedDish = dish[0].dishes.filter(selected => selected.id == req.params.id_dish);
        selected.push(selectedDish[0]);
        res.json({ status: 'Seleccionaste este platillo, result: selectedDish, selectedDishes: selected'});
      
    });

    app.post('/erase/:name', (req, res) => {
        let d = selected.findIndex(i => i.name == req.params.name);
        selected.splice(d,1)
        res.json({ status: 'Eliminado', result: selected})
        
    });

    app.post('/cancel', (req, res) => {
        selected.splice(0, selected.length)
        res.json({ status: 'Cancelado', result: selected})
    });

    app.post('/confirm', (req, res) => {
        let totalPrice = 0;
        for(let i = 0; i < selected.length; i++){
           totalPrice = totalPrice + selected[i].price
        }
        res.json({ status: '¡Gracias por tu compra!', result: selected, total: totalPrice})
    });
}