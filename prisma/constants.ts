export const categories = [
	{
		id: 1,
		name: "Пиццы",
	},
	{
		id: 2,
		name: "Завтрак",
	},
	{
		id: 3,
		name: "Закуски",
	},
	{
		id: 4,
		name: "Коктейли",
	},
	{
		id: 5,
		name: "Напитки",
	},
];

export const _ingredients = [
	{
		name: "Сырный бортик",
		price: 179,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png",
	},
	{
		name: "Сливочная моцарелла",
		price: 79,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png",
	},
	{
		name: "Сыры чеддер и пармезан",
		price: 79,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796",
	},
	{
		name: "Острый перец халапеньо",
		price: 59,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png",
	},
	{
		name: "Нежный цыпленок",
		price: 79,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A",
	},
	{
		name: "Шампиньоны",
		price: 59,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324",
	},
	{
		name: "Бекон",
		price: 79,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F",
	},
	{
		name: "Ветчина",
		price: 79,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61",
	},
	{
		name: "Пикантная пепперони",
		price: 79,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3",
	},
	{
		name: "Острая чоризо",
		price: 79,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027",
	},
	{
		name: "Маринованные огурчики",
		price: 59,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B",
	},
	{
		name: "Свежие томаты",
		price: 59,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67",
	},
	{
		name: "Красный лук",
		price: 59,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C",
	},
	{
		name: "Сочные ананасы",
		price: 59,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0",
	},
	{
		name: "Итальянские травы",
		price: 39,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png",
	},
	{
		name: "Сладкий перец",
		price: 59,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B",
	},
	{
		name: "Кубики брынзы",
		price: 79,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349",
	},
	{
		name: "Митболы",
		price: 79,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png",
	},
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
	{
		id: 1,
		name: "Омлет с ветчиной и грибами",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/019b12c7353b76d988cab1310b627eb4.avif",
		categoryId: 2,
	},
	{
		id: 2,
		name: "Омлет с пепперони",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/019b12cf2f6a74b481d7b46e844d1b78.avif",
		categoryId: 2,
	},
	{
		id: 3,
		name: "Кофе Латте",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/01982280d7c4789d94ac8dac4f1d064c.avif",
		categoryId: 2,
	},
	{
		id: 4,
		name: "Куриные наггетсы",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/0198131dce8b706bb3ed5a169df1bc84.avif",
		categoryId: 3,
	},
	{
		id: 5,
		name: "Картофель из печи с соусом",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/0198ae98f5a377b4938dd4c854f1857c.avif",
		categoryId: 3,
	},
	{
		id: 6,
		name: "Додстер",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/01980cb92528769295aeb186fb501f8e.avif",
		categoryId: 3,
	},
	{
		id: 7,
		name: "Острый додстер",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/01980cb9c5f8725aa9fb71a2ed7095a7.avif",
		categoryId: 3,
	},
	{
		id: 8,
		name: "Клубничный молочный коктейль",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/0199ae7135777528bca136648af27fb4.avif",
		categoryId: 4,
	},
	{
		id: 9,
		name: "Молочный коктейль Фисташка",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/0199864a65a871ebade4be4d862a7c20.avif",
		categoryId: 4,
	},
	{
		id: 10,
		name: "Молочный коктейль с печеньем Орео",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/019986494294739e9e1edf44accf8dcc.avif",
		categoryId: 4,
	},
	{
		id: 11,
		name: "Молочный коктейль с печеньем орео",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/019592032ce273a591b95002319bc4e9.avif",
		categoryId: 4,
	},
	{
		id: 12,
		name: "Латте Темный лес",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/01995c21fa247222a0e435d8924a73f6.avif",
		categoryId: 5,
	},
	{
		id: 13,
		name: "Кофе Карамельный капучино",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/01998643e1e178e585b36ba6e316425f.avif",
		categoryId: 5,
	},
	{
		id: 14,
		name: "Кофе Кокосовый латте",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/019986418bc778a0b03f86d1a332229b.avif",
		categoryId: 5,
	},
	{
		id: 15,
		name: "Кофе Американо",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/0198227e7bd6747dba99b60e75697c75.avif",
		categoryId: 5,
	},
	{
		id: 16,
		name: "Кофе Латте",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/01982280d7c4789d94ac8dac4f1d064c.avif",
		categoryId: 5,
	},
];
