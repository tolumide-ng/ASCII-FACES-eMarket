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
					<Route path="/" exact component={Home} />
					<Route path="/deals/:id" component={Modal} />

					<Route path="*" component={NotFound} />
				</Switch>
			</div>
		</HashRouter>
	);
};

export default Routes;
