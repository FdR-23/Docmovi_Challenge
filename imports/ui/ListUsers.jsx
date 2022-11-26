import React from 'react'


import { useTracker } from 'meteor/react-meteor-data';
import { UserCollection } from '../api/newUsers.js';

import User from './User'
const ListUsers = () => {

    const users = useTracker(() => UserCollection.find({}).fetch());
   
    const deletUser = (_id) => UserCollection.remove(_id);

    return (
        <div>

            <div className='grid grid-cols-12 border-b-2 border-stone-700 text-center font-semibold text-md'>
                <p className="mb-1"># RUT</p>
                <p className="mb-1 col-span-2">Name</p>
                <p className="mb-1 col-span-2">Father's Last Name</p>
                <p className="mb-1 col-span-2">Mother's Last Name</p>
                <p className="mb-1 col-span-2">Región</p>
                <p className="mb-1 col-span-2">Comuna</p>
                <p className="mb-1">Remove</p>
            </div>
            {users?.map((element) => <User key={element._id} data={element} deletUser={deletUser} />)}
        </div>
    )
}

export default ListUsers