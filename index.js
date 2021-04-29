$(document).ready(() => {
	console.log("document ready");
});

const addFood = (e) => {
	e.preventDefault();

	const title = $("#title-field");
	const food_url = $("#foodUrl-field");

	$.ajax({
		type: "POST",
		url: "http://localhost:3000/foods",
		headers: {
			access_token: localStorage.getItem("access_token"),
		},
		data: {
			title: title.val(),
			food_url: food_url.attr("href"),
		},
	})
		.done((data) => {
			console.log(data);
		})
		.fail((err) => console.log(err))
		.always((_) => {
			displayFood();
		});
};

const displayFoods = () => {
	$.ajax({
		type: "GET",
		url: "http://localhost:3000/foods",
		headers: {
			access_token: localStorage.getItem("access_token"),
		},
	})
		.done((data) => {
			const foodContainer = $("#list-food-cotainer");
			foodContainer.empty();
			data.forEach((food) => {
				foodContainer.append(`

        `);
			});
			foodContainer.append();
		})
		.fail((err) => console.log(err))
		.always((_) => {
			$(".food-del-btn").on("click", deleteFood);
		});
};

const deleteFood = (e) => {
	e.preventDefault();
	const foodId = e.target.getAttribute("data-id");

	$.ajax({
		type: "DELETE",
		url: `http://localhost:3000/foods/${foodId}`,
		headers: {
			access_token: localStorage.getItem("access_token"),
		},
	})
		.done((data) => {
			console.log(data);
		})
		.fail((err) => console.log(err))
		.always((_) => {
			displayFood();
		});
};

const generateFood = (e) => {
	e.preventDefault();
	$.ajax({
		type: "GET",
		url: "http://localhost:3000/foods/random",
		headers: {
			access_token: localStorage.getItem("access_token"),
		},
	})
		.done((data) => {
			const foodContainer = $("#food-cotainer");
			foodContainer.empty();
			foodContainer.append(`
      
      `);
		})
		.fail((err) => console.log(err));
};
