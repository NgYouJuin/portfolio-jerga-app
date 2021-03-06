

import { useGetUser } from 'actions/user';
import Redirect from 'components/shared/Redirect';
import { isAuthorized } from 'utils/auth0';

const withAuthHoc = Component => role => {
  return props => {
    const { data, loading } = useGetUser();
    // console.log(role && !isAuthorized(data, role))
    if (loading) {
      return <p>Loading...</p>
    }

    if (!data) {
      return <Redirect ssr to="/api/v1/login" />
    } else {
      if(role && !isAuthorized(data, role)){
        return <Redirect ssr to="/api/v1/login" />
      }
      return <Component user={data} loading={loading} {...props}/>
    }
  }
}

export default withAuthHoc;