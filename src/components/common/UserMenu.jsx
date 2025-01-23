import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsSearch, BsBell, BsPersonCircle } from 'react-icons/bs';
import Dropdown from 'react-bootstrap/Dropdown';

const UserMenu = ({ handleLogout, userId }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        // 여기서 사용자 데이터를 불러올 수도 있지만, 프로필 이미지는 사용하지 않음
      } catch (error) {
        console.error('유저 데이터 로드 실패:', error.message);
      } finally {
        setIsLoading(false);
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
          {isLoading ? (
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#f0f0f0',
              }}
            />
          ) : (
            <BsPersonCircle size={32} />
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
