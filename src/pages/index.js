import Register from './Register';
import Landing from './Landing';
import Provision from './Provision';
import Connect from './Provision';
import Instance from './Instance'
import Error from './Error';

export {
  Register,
  Landing,
  Provision, 
  Connect,
  Instance,
  Error,
}

// Components have to be imported one by one
// importing them in an object and referencing
// ../pages will cause some kind of stack overflow