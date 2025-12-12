import  { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Profile = () => {

    const {backendUrl, token} = useContext(ShopContext)

    const [user, setUser] = useState(null);

    const fetchUserData = async () => {
        try {
            if(!token){
                return null
            }

            const response = await axios.get(backendUrl + '/api/user/profile', {headers: {token}})
            console.log(response.data)
            // if (response.data.success) {
            //     setUser(response.data.user);
            // } else {
            //     console.log(response.data.message);
            // }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [token])

  return (
    <div className="border-t pt-10">
      <div className="text-2xl">
        <Title text1={"My Profile"} />
      </div>

      <div className="mt-4">
        {user ? (
          <div>
            <p><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
}
export default Profile
