import React from 'react'; 

import ViewProfile from '../../components/view-profile/viewprofile.component';
import ProfileInfo from '../../components/profile-info/profile-info.component';

import './profilepage.styles.scss';


const ProfilePage = () => (
    <div className='profile-page'>
        <ViewProfile />
        <ProfileInfo />
    </div>
);

export default ProfilePage;