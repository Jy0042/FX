import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsSearch, BsBell, BsPersonCircle } from 'react-icons/bs';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

const UserMenu = ({ handleLogout, userId }) => {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return; // userId가 없으면 요청하지 않음
      try {
        const response = await axios.get(`/api/v1/users/${userId}`);
        setProfileImage(response.data.profileImage || null);
      } catch (error) {
        console.error('유저 데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div className="d-flex align-items-center">
      <button className="btn btn-link text-dark p-0 me-3">
        <BsSearch size={20} />
      </button>

      <button className="btn btn-link text-dark p-0 me-3">
        <BsBell size={20} />
      </button>

      <Dropdown align="end">
        <Dropdown.Toggle as="div" className="d-flex align-items-center cursor-pointer">
          {profileImage ? (
            <img
              src={profileImage}
              alt="프로필"
              className="rounded-circle"
              style={{ width: '32px', height: '32px' }}
            />
          ) : (
            <BsPersonCircle size={32} className="text-secondary" />
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/profile">
            내 프로필
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/settings">
            설정
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
