import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsSearch, BsPersonCircle, BsBellFill, BsBoxArrowRight } from 'react-icons/bs';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

const UserMenu = ({ handleLogout, userId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/v1/users/${userId}`, { withCredentials: true });
        setUserName(response.data.user?.nickname || '사용자');
      } catch (error) {
        console.error('유저 데이터 로드 실패:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleToggle = (isOpen) => {
    setIsMenuOpen(isOpen);
  };

  return (
    <div className="d-flex align-items-center">
      <button className="btn btn-link text-dark p-0 me-3">
        <BsSearch size={20} />
      </button>
      <button className="btn btn-link text-dark p-0 me-3">
        <BsBellFill size={20} />
      </button>
      <Dropdown onToggle={(isOpen) => setIsMenuOpen(isOpen)}>
        <Dropdown.Toggle
          as="div"
          className="d-flex align-items-center cursor-pointer position-relative dropdown-toggle"
        >
          {isLoading ? (
            <div
              className="spinner-border text-secondary"
              style={{ width: '32px', height: '32px' }}
            />
          ) : (
            <>
              <BsPersonCircle size={28} className="text-dark" />
              <span className="ms-2 text-primary user-name">{userName}</span>
              <span
                className={`dropdown-toggle-icon ms-2 ${isMenuOpen ? 'rotate-up' : 'rotate-down'}`}
              ></span>
            </>
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu
          className={`dropdown-menu custom-dropdown-menu ${isMenuOpen ? 'menu-open' : ''}`}
        >
          <Dropdown.Item as={Link} to="/profile">
            마이페이지
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/feed">
            나의 피드
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/notifications">
            알림 목록
          </Dropdown.Item>
          <Dropdown.Divider />
          <button
            className="btn btn-dark w-100 d-flex align-items-center justify-content-center logout-button"
            onClick={handleLogout}
          >
            <BsBoxArrowRight className="me-2" />
            로그아웃
          </button>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
