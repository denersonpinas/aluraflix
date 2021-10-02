var animesIniciais = [
	{
		img: "https://wallpaperaccess.com/full/17350.jpg",
		categoria: "aventura",
		title: "One Piece",
		resumo: String
	},
	{
		img:
			"https://img.elo7.com.br/product/original/1DD74EE/painel-em-lona-reforcada-g-dragon-ball-z-lona.jpg",
		categoria: "ação",
		title: "Dragon Ball Super",
		resumo: String
	},
	{
		img: "https://www.nawpic.com/media/2020/naruto-4k-nawpic-2.jpg",
		categoria: "aventura",
		title: "Naruto Shippuden",
		resumo: String
	},
	{
		img:
			"https://img.elo7.com.br/product/original/30FDC12/adesivo-personalizado-para-parede-anime-hunter-x-hunter-filmes.jpg",
		categoria: "aventura",
		title: "Hunter x Hunter",
		resumo: String
	},
	{
		img:
			"https://images-na.ssl-images-amazon.com/images/S/pv-target-images/a318dd8dd104ec5b3b0996a0b08f8b6ceeeec33a3ad2a5420dd9c675928bcf62._RI_V_TTW_.jpg",
		categoria: "ação",
		title: "Mob Psycho",
		resumo: String
	},
	{
		img:
			"https://www.nerdtrip.com.br/wp-content/uploads/2020/07/Black-Clover-anime-black-bulls-screenshot-destaque.jpg",
		categoria: "ação",
		title: "Black Clover",
		resumo: String
	},
	{
		img:
			"https://cdn.falauniversidades.com.br/wp-content/uploads/2020/04/17124907/My-Hero-Academia.jpg",
		categoria: "ação",
		title: "Boku no Hero",
		resumo: String
	},
	{
		img:
			"https://i0.wp.com/wp-corp.qoo-app.com/en/wp-content/uploads/sites/3/2021/06/21061605185545.jpeg",
		categoria: "aventura",
		title: "Chain Chronicle",
		resumo: String
	},
	{
		img:
			"https://criticalhits.com.br/wp-content/uploads/2021/04/Fairy-Tail-capa.jpg",
		categoria: "aventura",
		title: "Fairy Tail",
		resumo: String
	},
	{
		img:
			"https://www.intoxianime.com/wp-content/uploads/2016/08/57533-haikyuu-haik222yuu.jpg",
		categoria: "esporte",
		title: "Haikyuu",
		resumo: String
	},
	{
		img: "https://wallpaperaccess.com/full/203411.jpg",
		categoria: "terror",
		title: "Tokyo Ghoul",
		resumo: String
	}
];

function InitialLoad() {
	db.transaction(function (puxar) {
		puxar.executeSql("SELECT * FROM animes", [], function (puxar, resultado) {
			var rows = resultado.rows;
			if (rows.length <= 0) {
				console.log(rows.length);
				for (let i = 0; i < animesIniciais.length; i++) {
					db.transaction(function (armazenar) {
						armazenar.executeSql(
							"INSERT INTO animes (img, title, categoria, resumo) VALUES (?, ?, ?, ?)",
							[
								animesIniciais[i].img,
								animesIniciais[i].title.toUpperCase(),
								animesIniciais[i].categoria,
								""
							]
						);
					});
				}
			}
		});
	});
	buscarAnime();
}

var db = openDatabase("Meubanco", "2.0", "Mybase", 4048);
db.transaction(function (criar) {
	criar.executeSql(
		"CREATE TABLE animes (ID PRIMARY KEY, img TEXT, title TEXT, categoria TEXT, resumo TEXT)"
	);
});

var catAventura = [];
var catAcao = [];
var catTerror = [];
var catRomance = [];
var catEsporte = [];
var catFantasia = [];
var catGame = [];

var contAventura = 0;
var contAcao = 0;
var contTerror = 0;
var contRomance = 0;
var contEsporte = 0;
var contFantasia = 0;
var contGame = 0;

function buscarAnime() {
	db.transaction(function (puxar) {
		puxar.executeSql("SELECT * FROM animes", [], function (puxar, resultado) {
			var rows = resultado.rows;
			for (let i = 0; i < rows.length; i++) {
				const element = rows[i];
				if (element["categoria"] == "aventura") {
					catAventura.push(rows[i]);
				} else if (element["categoria"] == "ação") {
					catAcao.push(rows[i]);
				} else if (element["categoria"] == "terror") {
					catTerror.push(rows[i]);
				} else if (element["categoria"] == "romance") {
					catRomance.push(rows[i]);
				} else if (element["categoria"] == "esporte") {
					catEsporte.push(rows[i]);
				} else if (element["categoria"] == "fantasia") {
					catFantasia.push(rows[i]);
				} else if (element["categoria"] == "game") {
					catGame.push(rows[i]);
				}
			}

			if (catAventura.length > 0) {
				printCategoria(catAventura, "Aventura");
			}
			if (catAcao.length > 0) {
				printCategoria(catAcao, "Açao");
			}
			if (catTerror.length > 0) {
				printCategoria(catTerror, "Terror");
			}
			if (catRomance.length > 0) {
				printCategoria(catRomance, "Romance");
			}
			if (catEsporte.length > 0) {
				printCategoria(catEsporte, "Esporte");
			}
			if (catFantasia.length > 0) {
				printCategoria(catFantasia, "Fantasia");
			}
			if (catGame.length > 0) {
				printCategoria(catGame, "Game");
			}
		});
	});
}

function cadastroAnime() {
	var urlAnime = document.formularioCadAnime.iimg.value;
	var titleAnime = document.formularioCadAnime.ititle.value;
	var spanAnime = document.formularioCadAnime.icategoria.value;
	var verific = false;

	db.transaction(function (puxar) {
		console.log("OK");
		puxar.executeSql(
			"SELECT title FROM  animes",
			[],
			function (puxar, resultado) {
				var rows = resultado.rows;
				for (const key in rows) {
					console.log(rows[key].title);
					if (titleAnime.toUpperCase() == rows[key].title) {
						verific == true;
					}
				}
			}
		);
	});

	if (!verific) {
		db.transaction(function (armazenar) {
			armazenar.executeSql(
				"INSERT INTO animes (img, title, categoria, resumo) VALUES (?, ?, ?, ?)",
				[urlAnime, titleAnime.toUpperCase(), spanAnime, ""]
			);
		});

		// Recarrega a página atual sem usar o cache
		document.location.reload(true);
	}
}

function deletandoAnime() {
	var titleAnime = document.formularioDelAnime.ititle.value;

	db.transaction(function (armazenar) {
		armazenar.executeSql("DELETE FROM animes WHERE title = ?", [
			titleAnime.toUpperCase()
		]);
	});

	// Recarrega a página atual sem usar o cache
	document.location.reload(true);
}

function printCategoria(rows, categoria) {
	var divAnime = document.querySelector(".categoria");

	var divPrincipal = document.createElement("div");
	var h1Nova = document.createElement("h1");
	divPrincipal.classList.add("section-anime");

	h1Nova.innerHTML = categoria;

	divAnime.insertAdjacentElement("beforeend", h1Nova);
	divAnime.insertAdjacentElement("beforeend", divPrincipal);

	for (let i = contAventura; i < 4 + contAventura; i++) {
		const element = rows[i];
		if (rows[i] != undefined) {
			var divNova = document.createElement("div");
			var imgNova = document.createElement("img");
			var h2Nova = document.createElement("h2");
			var spanNova = document.createElement("span");

			imgNova.src = element["img"];
			h2Nova.innerHTML = element["title"];
			spanNova.innerHTML = element["categoria"];
			divNova.insertAdjacentElement("beforeend", imgNova);
			divNova.insertAdjacentElement("beforeend", h2Nova);
			divNova.insertAdjacentElement("beforeend", spanNova);

			divPrincipal.insertAdjacentElement("beforeend", divNova);
		}
	}
}
