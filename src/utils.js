// Create an array of different sizes

export const arrOfSizes = () => {
	let sizes = [];
	for (let i = 12; i <= 200; i++) {
		sizes.push(i);
	}
	return sizes;
};

// Convert cents into dollars
export const centToDollar = cents => {
	// execute the function only if cents the function receives the argument
	if (cents && typeof Number(cents) === "number") {
		let dollars = Number(cents) / 100;
		return dollars.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});
	}
	return "Please pass a valid number in cents";
};

// If the date the ascii face was created in more than seven days return the date
export const convertToDaysAgo = createdDate => {
	if (
		new Date(createdDate) instanceof Date &&
		!isNaN(new Date(createdDate))
	) {
		const dateCreated = new Date(createdDate);
		const today = new Date();
		const dayInMs = 24 * 3600 * 1000;

		// set Hours/Minutes/Seconds/Milliseconds of dates to Zero to get accurate value of substraction
		dateCreated.setHours(0, 0, 0, 0);
		today.setHours(0, 0, 0, 0);

		const daysAgo = (+today - +dateCreated) / dayInMs;
		// Check how many days ago it was created
		if (daysAgo > 7) {
			return `${dateCreated.getFullYear()}/${dateCreated.getMonth()}/${dateCreated.getDate()}`;
		}
		return `${daysAgo} days ago`;
	}
	return "You need to pass a valid date";
};
