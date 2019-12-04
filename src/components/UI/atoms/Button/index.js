import React from "react";

const Button = React.forwardRef((props, ref) => {
	const { type, classes, title, ...rest } = props.props;
	return (
		<button
			type={type}
			className={`${classes} px-4 rounded tracking-wide antialiased`}
			{...rest}
			ref={ref}
		>
			{title}
		</button>
	);
})

export default Button;
