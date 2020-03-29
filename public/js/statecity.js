ciudades = {
    "p1" : {
        "\"50984\"": "Puerto Ayora",
        "\"50983\"": "Puerto Baquerizo Moreno",
        "\"50980\"": "Puerto Villamil"
    },
    "p2" : {
        "\"51035\"": "Cuenca",
    "\"51030\"": "Gualaceo",
    "\"51016\"": "La Union",
    "\"51015\"": "Llacao",
    "\"51000\"": "Nulti"
    },
    "p3" : {
        "\"51027\"": "Guaranda",
    "\"50966\"": "San Miguel"
    },
    "p4" : {
        "\"51055\"": "Azogues",
    "\"51047\"": "Canar",
    "\"51017\"": "La Troncal"
    },
    "p5" : {
        "\"51034\"": "El Angel",
    "\"50969\"": "San Gabriel",
    "\"50951\"": "Tulcan"
    },
    "p6" : {
        "\"51060\"": "Alausi",
    "\"51028\"": "Guano",
    "\"50974\"": "Riobamba"
    },
    "p7" : {
        "\"51019\"": "La Mana",
    "\"51018\"": "Latacunga",
    "\"50979\"": "Pujili",
    "\"50965\"": "San Miguel de Salcedo",
    "\"50957\"": "Saquisili"
    },
    "p8" : {
        "\"51025\"": "Huaquillas",
    "\"51009\"": "Machala",
    "\"50994\"": "Pasaje",
    "\"50988\"": "Pinas",
    "\"50986\"": "Portovelo",
    "\"50982\"": "Puerto Bolivar",
    "\"50960\"": "Santa Rosa",
    "\"50943\"": "Zaruma"
    },
    "p9" : {
        "\"51036\"": "Cube",
    "\"51031\"": "Esmeraldas",
    "\"51003\"": "Muisne",
    "\"50972\"": "Rosa Zarate",
    "\"50967\"": "San Lorenzo de Esmeraldas",
    "\"50950\"": "Valdez"
    },
    "p10" : {
        "\"51059\"": "Alfredo Baquerizo Moreno",
    "\"51052\"": "Balao",
    "\"51051\"": "Balzar",
    "\"51039\"": "Colimes",
    "\"51038\"": "Coronel Marcelino Mariduena",
    "\"51032\"": "El Triunfo",
    "\"51033\"": "Eloy Alfaro",
    "\"51026\"": "Guayaquil",
    "\"51020\"": "La Libertad",
    "\"51013\"": "Lomas de Sargentillo",
    "\"51007\"": "Milagro",
    "\"51002\"": "Naranjal",
    "\"51001\"": "Naranjito",
    "\"50996\"": "Palestina",
    "\"50992\"": "Pedro Carbo",
    "\"50987\"": "Playas",
    "\"50970\"": "Samborondon",
    "\"50961\"": "Santa Lucia",
    "\"50949\"": "Velasco Ibarra",
    "\"50946\"": "Yaguachi Nuevo"
    },
    "p11" : {
        "\"51056\"": "Atuntaqui",
    "\"51037\"": "Cotacachi",
    "\"51024\"": "Ibarra",
    "\"50999\"": "Otavalo",
    "\"50989\"": "Pimampiro"
    },
    "p12" : {
        "\"51046\"": "Cariamanga",
    "\"51045\"": "Catacocha",
    "\"51044\"": "Catamayo",
    "\"51041\"": "Celica",
    "\"51014\"": "Loja",
    "\"51012\"": "Macara"
    },
    "p13" : {
        "\"51054\"": "Babahoyo",
    "\"51043\"": "Catarama",
    "\"51006\"": "Montalvo",
    "\"50997\"": "Palenque",
    "\"50976\"": "Quevedo",
    "\"50948\"": "Ventanas",
    "\"50947\"": "Vinces"
    },
    "p14" : {
        "\"51053\"": "Bahia de Caraquez",
    "\"51048\"": "Calceta",
    "\"51040\"": "Chone",
    "\"51023\"": "Jipijapa",
    "\"51022\"": "Junin",
    "\"51008\"": "Manta",
    "\"51004\"": "Montecristi",
    "\"50998\"": "Pajan",
    "\"50993\"": "Pedernales",
    "\"50985\"": "Portoviejo",
    "\"50973\"": "Rocafuerte",
    "\"50958\"": "San Vicente",
    "\"50964\"": "Santa Ana",
    "\"50956\"": "Sucre",
    "\"50952\"": "Tosagua",
    "\"51062\"": "Wilfrido Loor Moreira"
    },
    "p15" : {
        "\"51029\"": "Gualaquiza",
    "\"51011\"": "Macas",
    "\"50995\"": "Palora",
    "\"50955\"": "Sucua",
    "\"50954\"": "Taisha"
    },
    "p17" : {
        "\"51005\"": "Montalvo",
    "\"50978\"": "Puyo",
    "\"50963\"": "Santa Clara"
    },
    "p18" : {
        "\"51042\"": "Cayambe",
    "\"51010\"": "Machachi",
    "\"50975\"": "Quito",
    "\"50968\"": "Sangolqui",
    "\"51063\"": "Tutamandahostel"
    },
    "p19" : {
        "\"51058\"": "Ambato",
    "\"51050\"": "Banos",
    "\"50991\"": "Pelileo",
    "\"50990\"": "Pillaro",
    "\"50977\"": "Quero"
    },
    "p20" : {
        "\"50945\"": "Yantzaza",
    "\"50944\"": "Zamora"
    },
    "p22" : {
        "\"51061\"": "Gonzalo Pizarro",
    "\"51021\"": "Nueva Loja"
    },
    "p23" : {
        "\"51057\"": "Archidona",
    "\"50953\"": "Tena"
    },
    "p24" : {
        "\"51049\"": "Boca Suno",
    "\"50981\"": "Puerto Francisco de Orellana"
    },
    "p25" : {
        "\"50971\"": "Salinas",
    "\"50962\"": "Santa Elena"
    },
    "p26" : {
        "\"50959\"": "Santo Domingo de los Colorados"
    }
};

$('#provincia').on("change", (ev) => {
    let stateId = $("#provincia option:selected").attr('stateid');
    if(stateId != ''){
        $.each(ciudades['p'+stateId], (key,val)=>{
            var option = jQuery('<option />');
            option.attr('value', val).text(val);
            jQuery('#ciudad').append(option);
        });
    }else{
        $('.ciudades option:gt(0)').remove();
    }
});

