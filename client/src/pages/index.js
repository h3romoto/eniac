import BuildInstance from "./BuildInstance";
import Connect from "./Connect";
import Error from "./Error";
import Landing from "./Landing";
import Register from "./Register";
import Dashboard from "./Dashboard";

export { BuildInstance, Connect, Dashboard, Error, Landing, Register };

// Components have to be imported one by one
// importing them in an object and referencing
// ../pages will cause some kind of stack overflow