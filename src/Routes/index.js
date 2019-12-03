import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "../components/Pages/Home";
import NotFound from "../components/Pages/NotFound";
import Modal from "../components/UI/organisms/Modal";

const Routes = () => {
	return (
		<HashRouter>
			<div>
				<Switch>
					<Route path="/" component={Home} />
					<Route path="*" component={NotFound} />
				</Switch>
			</div>
		</HashRouter>
	);
};

export default Routes;
