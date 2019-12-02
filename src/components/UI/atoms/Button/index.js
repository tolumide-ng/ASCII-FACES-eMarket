import React from "react";

const Button = ({ type, classes, title, ...props }) => {
	return (
		<button
			type={type}
			className={`${classes} px-4 rounded tracking-wide antialiased`}
			{...props}
		>
			{title}
		</button>
	);
};

export default Button;
